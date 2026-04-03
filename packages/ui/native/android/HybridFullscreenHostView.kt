package com.margelo.nitro.reactnativevideo.controls

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.annotation.Keep
import androidx.fragment.app.FragmentActivity
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.uimanager.ThemedReactContext

@Keep
@DoNotStrip
class HybridFullscreenHostView(private val context: ThemedReactContext) : HybridFullscreenHostViewSpec() {

  // State
  private var originalParent: ViewGroup? = null
  private var originalIndex: Int = 0
  private var originalLayoutParams: ViewGroup.LayoutParams? = null
  private var originalWidth: Int = 0
  private var originalHeight: Int = 0
  private var placeholder: View? = null
  private var dialogFragment: FullscreenDialogFragment? = null

  // HybridView
  override val view: View = FrameLayout(context).apply {
    setBackgroundColor(Color.BLACK)
    clipChildren = true
  }

  // Props
  override var onFullscreenChange: ((isFullscreen: Boolean) -> Unit)? = null

  override fun enterFullscreen() {
    if (dialogFragment != null) return
    val activity = context.currentActivity as? FragmentActivity ?: return
    val parent = view.parent as? ViewGroup ?: return

    // 1. Save state
    originalParent = parent
    originalIndex = parent.indexOfChild(view)
    originalLayoutParams = view.layoutParams
    originalWidth = view.width
    originalHeight = view.height

    // 2. Placeholder
    val ph = View(context).apply {
      setBackgroundColor(Color.BLACK)
      layoutParams = ViewGroup.LayoutParams(originalWidth, originalHeight)
    }
    parent.addView(ph, originalIndex)
    placeholder = ph

    // 3. Get screen position before reparenting
    val loc = IntArray(2)
    view.getLocationOnScreen(loc)

    // 4. Create and show DialogFragment
    val fragment = FullscreenDialogFragment()
    dialogFragment = fragment
    fragment.show(activity.supportFragmentManager, "fullscreen")

    // 5. After dialog is shown, reparent view into it
    activity.supportFragmentManager.executePendingTransactions()
    val dialogContainer = fragment.dialog?.window?.decorView?.findViewById<FrameLayout>(android.R.id.content)
      ?: return

    // 6. Reparent to dialog
    parent.removeView(view)
    val params = FrameLayout.LayoutParams(originalWidth, originalHeight).apply {
      leftMargin = loc[0]
      topMargin = loc[1]
    }
    dialogContainer.addView(view, params)

    // 7. Animate expand
    val displayMetrics = context.resources.displayMetrics
    val targetWidth = displayMetrics.widthPixels.coerceAtLeast(displayMetrics.heightPixels)
    val targetHeight = displayMetrics.widthPixels.coerceAtMost(displayMetrics.heightPixels)

    view.post {
      val animX = ObjectAnimator.ofFloat(view, "x", loc[0].toFloat(), 0f)
      val animY = ObjectAnimator.ofFloat(view, "y", loc[1].toFloat(), 0f)
      val animW = ValueAnimator.ofInt(originalWidth, targetWidth).apply {
        addUpdateListener { view.layoutParams = view.layoutParams.apply { width = it.animatedValue as Int } }
      }
      val animH = ValueAnimator.ofInt(originalHeight, targetHeight).apply {
        addUpdateListener { view.layoutParams = view.layoutParams.apply { height = it.animatedValue as Int } }
      }

      AnimatorSet().apply {
        playTogether(animX, animY, animW, animH)
        duration = 300
        start()
      }
    }

    onFullscreenChange?.invoke(true)
  }

  override fun exitFullscreen() {
    val parent = originalParent ?: return
    val ph = placeholder ?: return
    val fragment = dialogFragment ?: return

    val dialogContainer = fragment.dialog?.window?.decorView?.findViewById<FrameLayout>(android.R.id.content)
      ?: return

    // 1. Get target position
    val loc = IntArray(2)
    ph.getLocationOnScreen(loc)

    // 2. Animate shrink
    val animX = ObjectAnimator.ofFloat(view, "x", loc[0].toFloat())
    val animY = ObjectAnimator.ofFloat(view, "y", loc[1].toFloat())
    val animW = ValueAnimator.ofInt(view.width, originalWidth).apply {
      addUpdateListener { view.layoutParams = view.layoutParams.apply { width = it.animatedValue as Int } }
    }
    val animH = ValueAnimator.ofInt(view.height, originalHeight).apply {
      addUpdateListener { view.layoutParams = view.layoutParams.apply { height = it.animatedValue as Int } }
    }

    AnimatorSet().apply {
      playTogether(animX, animY, animW, animH)
      duration = 300
      addListener(object : android.animation.AnimatorListenerAdapter() {
        override fun onAnimationEnd(animation: android.animation.Animator) {
          // 3. Reparent back
          dialogContainer.removeView(view)
          parent.removeView(ph)
          parent.addView(view, originalIndex, originalLayoutParams)

          // 4. Dismiss dialog
          fragment.dismissAllowingStateLoss()

          // 5. Cleanup
          placeholder = null
          originalParent = null
          originalLayoutParams = null
          dialogFragment = null
        }
      })
      start()
    }

    onFullscreenChange?.invoke(false)
  }
}
