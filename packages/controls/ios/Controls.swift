import UIKit

// MARK: - Main thread helper

private func onMain(_ block: @escaping () -> Void) {
  if Thread.isMainThread {
    block()
  } else {
    DispatchQueue.main.async { block() }
  }
}

// MARK: - HybridControls

class HybridControls : HybridControlsSpec {

  // MARK: - HybridView

  var view: UIView = {
    let v = UIView()
    v.backgroundColor = .clear
    v.isUserInteractionEnabled = false
    return v
  }()

  // MARK: - Props

  var color: String = "#000" {
    didSet {}
  }

  // MARK: - Fullscreen state

  private var originalParent: UIView?
  private var originalFrame: CGRect = .zero
  private var originalIndex: Int = 0
  private var placeholder: UIView?
  private var fullscreenVC: FullscreenViewController?

  // MARK: - Methods

  func enterFullscreen() throws {
    onMain { self.doEnterFullscreen() }
  }

  func exitFullscreen() throws {
    onMain { self.doExitFullscreen() }
  }

  // MARK: - Fullscreen impl

  private func doEnterFullscreen() {
    guard fullscreenVC == nil else { return }
    guard let window = view.window,
          let rootVC = window.rootViewController?.topMostViewController()
    else { return }
    guard rootVC.presentedViewController == nil else { return }

    // Save state
    originalParent = view.superview
    originalFrame = view.frame
    if let parent = originalParent {
      originalIndex = parent.subviews.firstIndex(of: view) ?? 0
    }

    // Placeholder
    let ph = UIView(frame: originalFrame)
    ph.backgroundColor = .black
    originalParent?.insertSubview(ph, at: originalIndex)
    placeholder = ph

    // Screen position
    let windowFrame = view.convert(view.bounds, to: window)
    let screenBounds = UIScreen.main.bounds

    // Create VC
    let vc = FullscreenViewController()
    vc.modalPresentationStyle = .overFullScreen
    fullscreenVC = vc

    // Present, then reparent
    rootVC.present(vc, animated: false) { [weak self] in
      guard let self = self else { return }

      self.view.removeFromSuperview()
      vc.view.addSubview(self.view)
      self.view.frame = windowFrame

      UIView.animate(withDuration: 0.3, delay: 0, options: .curveEaseInOut) {
        self.view.frame = screenBounds
      }
    }
  }

  private func doExitFullscreen() {
    guard let parent = originalParent,
          let ph = placeholder,
          let vc = fullscreenVC,
          let window = vc.view.window
    else { return }

    let targetFrame = ph.convert(ph.bounds, to: window)

    UIView.animate(withDuration: 0.3, delay: 0, options: .curveEaseInOut, animations: {
      self.view.frame = targetFrame
    }, completion: { _ in
      self.view.removeFromSuperview()
      parent.insertSubview(self.view, at: self.originalIndex)
      self.view.frame = self.originalFrame

      ph.removeFromSuperview()
      vc.dismiss(animated: false)

      self.placeholder = nil
      self.fullscreenVC = nil
      self.originalParent = nil
    })
  }
}

// MARK: - FullscreenViewController

class FullscreenViewController: UIViewController {
  override var prefersStatusBarHidden: Bool { true }
  override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .allButUpsideDown }
  override var prefersHomeIndicatorAutoHidden: Bool { true }
  override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge { .all }

  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .black
  }
}

// MARK: - UIViewController extension

private extension UIViewController {
  func topMostViewController() -> UIViewController {
    if let presented = presentedViewController {
      return presented.topMostViewController()
    }
    if let nav = self as? UINavigationController,
       let visible = nav.visibleViewController {
      return visible.topMostViewController()
    }
    if let tab = self as? UITabBarController,
       let selected = tab.selectedViewController {
      return selected.topMostViewController()
    }
    return self
  }
}
