import UIKit

class FullscreenViewController: UIViewController {
  override var prefersStatusBarHidden: Bool { true }
  override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .landscape }
  override var prefersHomeIndicatorAutoHidden: Bool { true }
  override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge { .all }

  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .black
    modalPresentationStyle = .overFullScreen
  }
}
