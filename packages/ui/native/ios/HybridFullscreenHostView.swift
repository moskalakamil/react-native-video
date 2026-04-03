import UIKit
import NitroModules

class HybridFullscreenHostView: HybridFullscreenHostViewSpec {

  // MARK: - State

  private var originalParent: UIView?
  private var originalFrame: CGRect = .zero
  private var originalIndex: Int = 0
  private var placeholder: UIView?
  private var fullscreenVC: FullscreenViewController?

  // MARK: - HybridView

  private lazy var containerView: UIView = {
    let v = UIView()
    v.clipsToBounds = true
    return v
  }()

  var view: UIView { containerView }

  // MARK: - Props

  var onFullscreenChange: ((_ isFullscreen: Bool) -> Void)?

  // MARK: - Methods

  func enterFullscreen() throws {
    guard fullscreenVC == nil else { return }
    guard let window = containerView.window,
          let rootVC = window.rootViewController?.topMostViewController()
    else { return }

    // 1. Save original state
    originalParent = containerView.superview
    originalFrame = containerView.frame
    if let parent = originalParent {
      originalIndex = parent.subviews.firstIndex(of: containerView) ?? 0
    }

    // 2. Insert placeholder
    let ph = UIView(frame: originalFrame)
    ph.backgroundColor = .black
    originalParent?.insertSubview(ph, at: originalIndex)
    placeholder = ph

    // 3. Get current screen position
    let windowFrame = containerView.convert(containerView.bounds, to: window)

    // 4. Create fullscreen VC
    let vc = FullscreenViewController()
    vc.modalPresentationStyle = .overFullScreen
    fullscreenVC = vc

    // 5. Reparent view to VC — maintain screen position
    containerView.removeFromSuperview()
    vc.view.addSubview(containerView)
    containerView.frame = windowFrame

    // 6. Present VC (no system animation — we animate ourselves)
    rootVC.present(vc, animated: false) { [weak self] in
      guard let self = self else { return }

      // 7. Animate expand to fullscreen bounds
      UIView.animate(
        withDuration: 0.3,
        delay: 0,
        options: .curveEaseInOut
      ) {
        self.containerView.frame = vc.view.bounds
      }
    }

    onFullscreenChange?(true)
  }

  func exitFullscreen() throws {
    guard let parent = originalParent,
          let ph = placeholder,
          let vc = fullscreenVC,
          let window = vc.view.window
    else { return }

    // 1. Calculate target frame in window coordinates
    let targetFrame = ph.convert(ph.bounds, to: window)

    // 2. Animate shrink to inline position
    UIView.animate(
      withDuration: 0.3,
      delay: 0,
      options: .curveEaseInOut,
      animations: {
        self.containerView.frame = targetFrame
      },
      completion: { _ in
        // 3. Reparent back to original position
        self.containerView.removeFromSuperview()
        parent.insertSubview(self.containerView, at: self.originalIndex)
        self.containerView.frame = self.originalFrame

        // 4. Cleanup
        ph.removeFromSuperview()
        vc.dismiss(animated: false)

        self.placeholder = nil
        self.fullscreenVC = nil
        self.originalParent = nil
      }
    )

    onFullscreenChange?(false)
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
