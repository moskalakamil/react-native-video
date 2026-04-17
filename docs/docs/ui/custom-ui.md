---
title: Custom Video UI - Architecture & Implementation Guide
sidebar_position: 1
sidebar_label: Custom UI
description: Learn how to build a custom video player UI with react-native-video v7 using compound components, Reanimated, and gesture-handler.
keywords: [custom UI, video player UI, compound components, reanimated, gesture handler, seekbar, fullscreen, ads UI, react native video]
---

# How to Build Custom UI

The built-in `controls={true}` prop in `react-native-video` covers roughly 70% of video use cases. This guide is about the remaining 30% - where default controls hit limits that matter for your product.

We maintain `react-native-video` and have shipped custom video UIs with teams across streaming, education, social, and enterprise. This guide distills what we've learned into a practical blueprint: the architecture we reach for, the traps we've seen teams fall into, and the places where JavaScript simply isn't the right tool.

## When custom UI is the right call

Custom UI is a deliberate decision with real engineering cost. It's worth it when:

- **You serve ads.** Default controls don't include a "Skip Ad" button with countdown - critical if you monetize through video ads.
- **Brand consistency matters.** Streaming/OTT apps and premium products expect a player that matches the rest of the experience. Default AVPlayer (iOS) and ExoPlayer (Android) controls look and feel different from each other out of the box.
- **You need features the defaults don't expose.** Chapter markers, custom quality selectors, reactions overlay (TikTok/Instagram-style), skip intro/outro buttons, scrubbing preview, watch-party indicators.
- **Analytics depth.** Own your UI, own the instrumentation - every seek, quality switch, and pause trigger becomes trivially loggable.

:::tip Honest advice
If none of the above applies to your product, `controls={true}` is the right choice. Custom UI is a multi-week investment - don't take it on without a clear product reason.
:::

## Why custom video UI is unlike most RN work

Most React Native features live entirely in the JS layer. Custom video UI doesn't. The moment you need custom subtitles, you're hooking into AVPlayer/ExoPlayer text track APIs. PiP controls are configured natively on both platforms with completely different APIs. AirPlay has no JS equivalent at all. Even something as "simple" as a seekbar that doesn't flicker requires Reanimated worklets running on the UI thread.

This means your team needs three things at once: React Native UI skills, native iOS/Android expertise, and deep knowledge of how `react-native-video` works internally - the plugin API, the player lifecycle, the event bridge, the platform-specific rendering pipeline.

We built all of that. We maintain `react-native-video`, we wrote the plugin system, and we've shipped custom player UIs across streaming, education, and enterprise products. When something requires a native module or an internal API change, we don't reverse-engineer it - we already know the codebase.

<table>
  <thead>
    <tr>
      <th>Build in-house when</th>
      <th>Consider outsourcing when</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Your team has experience with <code>react-native-video</code>, native modules, and is not afraid of complex animations</td>
      <td>Your team is strong in RN but lacks experience with native modules or complex animations</td>
    </tr>
    <tr>
      <td>You have dedicated weeks in your roadmap and requirements are stable</td>
      <td>You need features that cross the JS/native boundary - custom subtitle rendering, PiP, AirPlay, platform-specific gesture handling</td>
    </tr>
    <tr>
      <td>Your scope stays in the JS layer - no custom subtitles, no PiP controls, no AirPlay</td>
      <td>You need multi-platform parity (iOS + Android + tvOS/Android TV + Web) without months of platform-specific debugging</td>
    </tr>
    <tr>
      <td>You don't need features that touch native player APIs or <code>react-native-video</code> internals</td>
      <td>Your features need deep integration with <code>react-native-video</code> internals - e.g. custom subtitles done properly go through the plugin registry, not a JS overlay hack</td>
    </tr>
    <tr>
      <td>You're comfortable reading and extending native player code (AVPlayer / ExoPlayer)</td>
      <td>You're comparing this vs. licensing a commercial player like Bitmovin, JW Player, or THEOplayer - which often cost more annually than a one-time custom build</td>
    </tr>
  </tbody>
</table>

If the second list sounds like you, [let's talk →](https://sdk.thewidlarzgroup.com/ask-for-plugin?contact=true). Otherwise, read on - this guide will give you the blueprint.

## Architecture: compound components

**TL;DR**
- Use **compound components** (context + sub-components), not a monolithic `<VideoPlayer>` with 40 props
- Shared state through React context; each sub-component subscribes only to what it needs
- Boolean prop hell doesn't scale - testing becomes combinatorial, refactoring becomes dangerous

Video players have a lot of state: playing, buffering, seeking, fullscreen, muted, selected audio/subtitle track, chapter index, ad phase, PiP status. That state needs to be visible to many components at many levels of the tree - the seekbar cares about `currentTime`, the fullscreen button cares about orientation, the ads overlay cares about the ad phase.

The naive approach is a monolithic component with a long prop list - often called **"boolean prop hell"**. Every new feature adds props, testing becomes combinatorial, refactoring becomes dangerous:

```tsx
// Don't do this
<VideoPlayer
  source={source}
  showControls
  showChapters
  showAds
  isFullscreen
  onChapterChange={...}
  onAdSkip={...}
  // ... 30 more props
/>
```

The pattern that scales is **compound components** - small, flexible building blocks sharing state through context:

```tsx
<Player source={source}>
  <Player.Video />
  <Player.Controls>
    <Player.PlayPause />
    <Player.Seekbar />
    <Player.ChapterMarkers />
    <Player.TimeDisplay />
    <Player.FullscreenButton />
  </Player.Controls>
  <Player.AdOverlay>
    <Player.SkipAdButton />
  </Player.AdOverlay>
</Player>
```

Every sub-component is independently composable. Want chapter markers but no time display? Remove the line. Want a completely different layout on tablet? Rearrange. Want a new feature? Add a new sub-component that reads from the same context - no changes to existing ones.

:::info Further reading
Fernando Rojo's talk **["Composition Is All You Need"](https://www.youtube.com/watch?v=4KvbVq3Eg5w)** from React Universe Conf 2025 is the best resource on why this pattern wins over boolean props. If you're using AI coding assistants, Vercel's [composition patterns agent skill](https://skills.sh/vercel-labs/agent-skills/vercel-composition-patterns) codifies this approach.
:::

### State management

The player instance from `useVideoPlayer` is the source of truth for **video state** (current time, duration, buffered ranges). Your context is the source of truth for **UI state** (controls visibility, which menu is open, which tab is selected). Bridge them with `useEvent`:

```tsx
<PlayerContext.Provider value={{ player, ui, actions }}>
  <VideoView player={player} />
  {children}
</PlayerContext.Provider>
```

Sub-components read from context and subscribe only to the player events they care about.

:::warning Re-render trap
`onProgress` fires multiple times per second. If your handler calls `setState` on a value that cascades through the tree, you'll drop frames on mid-range devices. Keep high-frequency values (current time, buffer position) in **refs** or **Reanimated shared values**, not React state.
:::

**Related:** [`useVideoPlayer`](../player/use-video-player) · [Player events](../player/events) · [VideoPlayer class](../player/video-player)

## Animations: Reanimated is a requirement, not an option

React Native's built-in `Animated` API won't cut it for video UI. Player events cross the JS bridge, and driving animations from the JS thread introduces visible jank - especially on the seekbar, where even small delays are noticeable.

`react-native-reanimated` with `react-native-gesture-handler` is not a nice-to-have here - it's a hard requirement. Worklets run on the UI thread, shared values update without re-renders, and gesture responses stay smooth regardless of JS thread load.

## When JavaScript isn't enough

**TL;DR - features requiring native code:**
- **AirPlay / Google Cast pickers** - use existing library or thin native wrapper
- **Custom subtitle rendering** - JS parser (flexible, heavy) or thin native module (simple, stable)
- **Custom PiP controls** - iOS `AVPictureInPictureController` / Android `PictureInPictureParams.Builder`

A custom player UI in pure React Native will take you far - but not all the way. Certain features fundamentally require native code, either because the OS doesn't expose them through the RN bridge or because a JS implementation would be unacceptably heavy or brittle.

Here are the ones you're most likely to hit:

### 1. AirPlay / Google Cast pickers

The iOS AirPlay route picker is a native `AVRoutePickerView` - there's no JS equivalent. Same story on Android with Google Cast's MediaRouter SDK. You have two paths:

- **Use an existing library** - `react-native-google-cast` and a handful of AirPlay wrappers exist. Good enough if their styling and behavior match your needs.
- **Write a thin native wrapper** - if you need specific branding, custom button placement, or non-standard behavior (e.g. pre-connect callbacks), a simple native module wrapping the system picker is usually a 1-2 day job for a native iOS/Android dev.

### 2. Custom subtitle rendering

`react-native-video` exposes the active subtitle track selection, but the rendering itself has a fork in the road:

- **JS parser path.** You take the WebVTT/SRT/TTML file, parse it in JavaScript, and render cues as `<Text>` overlays. Upside: total control over styling (font, outline, background, position, fade animations). Downside: every edge case of the format is yours to handle - WebVTT cue settings, TTML regions, X/Y positioning, bidirectional text, ruby annotations for Japanese. Doing this well is weeks of work.
- **Thin native module path.** A small native layer pulls the currently active cue from AVPlayer/ExoPlayer and exposes it to JS as `{ text, start, end }`. You render it as `<Text>` with your own styling. Massively less code, more stable, at the cost of flexibility for very custom formats.

**Rule of thumb:** if you need basic subtitle display with your own styling, go native module. If you're doing something exotic (karaoke highlighting, per-word timing, emoji reactions embedded in subs), go JS parser and accept the cost.

### 3. Picture-in-Picture with custom controls

Default PiP gives you play/pause/close. If product wants chapter jump, skip 10s, or any other custom control inside the PiP window, you're in native territory - and iOS and Android have different APIs (`AVPictureInPictureController` vs. `PictureInPictureParams.Builder`). The JS layer can trigger PiP, but the controls inside it are configured natively.

:::tip Pattern we see often
Most React Native teams don't have deep native expertise - and for most apps, they shouldn't need to. Video is the exception. If your custom UI crosses into any of the above, budget for a native iOS/Android developer on the project, or [reach out to us](https://sdk.thewidlarzgroup.com/ask-for-plugin?contact=true) - this is the kind of work we do day-in, day-out on top of `react-native-video`.
:::

## The seekbar: where most custom UIs go wrong

**TL;DR - common pitfalls:**
- **Flickering** - drive width via `useSharedValue`, not `setState`
- **Drag conflict** - freeze progress subscription while user drags, commit seek once on release
- **Gesture ownership** - resolve `ScrollView` vs pan conflicts with `Gesture.Simultaneous()` or `waitFor`
- **Hitbox** - minimum 44×44pt (iOS) / 48×48dp (Android), even if visual is 4px tall
- **Android seek latency** - ExoPlayer seek is 200-500ms, always show a seeking indicator
- **iOS seek latency** - near-instant, don't show an indicator (looks broken)

The seekbar looks like a `<View>` with a colored bar. It is, in our experience, the single hardest UI element in a video player - and the one where we see the most shipped bugs in production apps.

Here's what goes into building one that doesn't embarrass you.

### Flickering

`onProgress` fires ~4 times per second. If you drive the seekbar's width via `setState`, users see a visible drift between smoothly playing video and a bar that jumps in ~250ms increments. The fix: the bar's position should live in a `useSharedValue` and be animated via `useAnimatedStyle`. Updates happen on the UI thread; there's no re-render cascade, no jump.

### Source-of-truth conflict during drag

While the user's finger is on the bar, the bar must show the **finger's position**, not the video's. When they let go, it must sync to video position without jumping.

The simpler approach: freeze the progress subscription while dragging, commit a single seek on release. This is straightforward to implement:

```tsx
// Sketch - the idea, not a copy-paste
const progress = useSharedValue(0);       // 0..1
const isDragging = useSharedValue(false);

// onProgress: only update when NOT dragging
// pan.onUpdate: drive progress from finger position
// pan.onEnd: commit seek once, then unfreeze
```

The more advanced approach: seek continuously as the user drags (scrubbing), so they see the video update in real-time under their finger. This is what YouTube and most native players do. The catch is that by default the video won't load frames fast enough to keep up with the finger - you'll see stale frames and stuttering. Getting smooth scrubbing requires native-side work (keyframe-aware seeking, thumbnail extraction, or frame pre-caching) and is significantly more effort.

### Gesture ownership

In a TikTok-style feed, your seekbar's pan gesture fights with the parent `ScrollView`'s vertical scroll. Resolve with `simultaneousHandlers` / `Gesture.Simultaneous()` or explicit `waitFor` relations - otherwise either the scroll steals the gesture mid-drag, or the drag blocks vertical scroll entirely. We've seen both in production.

### Hitbox vs. visual

Design will give you a 4px-tall bar. Apple HIG says minimum touch target is 44×44pt; Material Design says 48×48dp. Your options: `hitSlop` on the bar, or a transparent overlay view with the larger bounds receiving the gesture. Do neither and ~30% of users will miss on first tap - especially on bezel-less phones where the bottom of the screen is thumb-unfriendly.

### Buffered ranges

`onProgress` includes `playableDuration`. Rendering it as a second, dimmer bar beneath the main one is a common ask. Keep it on its own layer with a lower z-index; don't try to composite it into the same view as the main progress - the math on resize and during drag gets tangled fast.

### Chapter markers on the bar

Chapter markers are just sub-components reading `chapter.startTime / duration` and rendering at the right X offset. The real work is gesture disambiguation - for example: tap on marker seeks to chapter start, tap between markers seeks to that position, drag across markers ignores them and scrubs continuously. The exact behavior depends on your product - not every app wants the same interactions. We typically handle this with a single composite gesture rather than separate tap handlers on each marker.

### iOS vs. Android seek latency

On iOS, `AVPlayer` seeks are near-instant. On Android, `ExoPlayer`'s default seek with tolerance is 200-500ms depending on the stream and keyframe spacing. If your UI doesn't show a "seeking" state during that window, Android users will think the app froze. We always render a subtle loading indicator on the thumb during commit on Android - and skip it on iOS where it would look broken.

:::info Scrubbing preview thumbnails
Showing a thumbnail of the destination frame above the user's finger during drag (YouTube-style) is a frequent request - and an entire sub-project of its own. It involves thumbnail sprite sheets, WebVTT files mapping time ranges to sprite positions, runtime cropping, finger-vs-edge offset calculation, and sometimes native-side frame extraction for long videos where sprite sheets get too heavy.

It's out of scope for this guide. If it's on your list, [ask us about it →](https://sdk.thewidlarzgroup.com/ask-for-plugin?contact=true) - we've built it multiple times.
:::

**Related:** [Player events](../player/events) · [VideoPlayer class](../player/video-player) · [Chapters](./chapters)

## Gestures beyond the seekbar

A production video UI has a lot of gestures, and they all have to coexist:

- **Tap** - toggle controls visibility, auto-hide after 3s of inactivity. Sounds trivial; the timer management with mid-flight re-taps and hover states on TV isn't.
- **Double-tap** - seek ±10s (YouTube pattern), typically with a ripple animation on the tapped side. Watch out for the tap-vs-double-tap latency: if you delay the single tap to check for a double, controls feel sluggish.
- **Swipe down** - exit fullscreen. Hard part: distinguishing a swipe-to-exit from a scroll in the subtitles overlay or a drag on the seekbar. Use `Gesture.Simultaneous()` carefully.
- **Pinch** - toggle `contentFit` between `cover` and `contain`. Common on iOS stock Photos/TV apps.
- **Vertical edge swipes** - volume on the right, brightness on the left (stock iOS Photos pattern). Must not trigger inside the seekbar's hitbox.
- **System gestures** - iOS back-swipe from the left edge, Android 3-button nav. Your gestures have to coexist, which usually means leaving 20pt dead zones on the edges.

The only stack we recommend for this: **Reanimated worklets + gesture-handler's Gesture API**. Anything else will let you down on the combinatorics.

## Fullscreen and orientation

`react-native-video` provides a native fullscreen mode, but if you're building custom UI, using native fullscreen defeats the purpose - your custom controls disappear and the OS renders its own. Instead, you'll manage fullscreen yourself: expand the player to fill the screen while keeping your UI on top.

This means handling orientation yourself. Some apps only allow landscape fullscreen, others allow both portrait and landscape. Things to keep in mind:

- **Orientation lock.** Auto-rotate to landscape on fullscreen, restore on exit. But if the user has disabled rotation system-wide, you need to force orientation explicitly. On iPad Stage Manager, orientation calls are suggestions at best.
- **Safe area.** Notches, Dynamic Island, Android navigation bar. Controls must respect safe area insets - in landscape, "safe" is on the sides, not top/bottom.
- **Status bar and navigation bar.** `StatusBar.setHidden()` on iOS, Android's immersive mode flags. Animate the transition; a popping status bar looks broken.
- **Transition animation.** Inline to fullscreen should be a smooth expand, not a hard cut. This means Reanimated layout animations or a hand-rolled shared element transition.

### Picture-in-Picture

There are three approaches depending on your product:

- **Default PiP.** Use the built-in `react-native-video` PiP support. You get play/pause/close with OS-default styling. Works outside the app. Least effort, least control.
- **Styled PiP.** Customize the native PiP controls where the platform allows. Still uses OS-level PiP, so it works outside the app, but styling options are limited - iOS and Android expose different customization APIs.
- **In-app floating video.** Build a draggable mini-player inside your app (like YouTube's minimized player). This gives you full control over styling and interactions - custom buttons, progress bar, gestures. The trade-off: it only works while the app is in the foreground. Outside the app, PiP won't be available unless you also implement native PiP as a fallback.

**Related:** [VideoView props](../video-view/props) · [VideoView events](../video-view/events) · [VideoView methods](../video-view/methods)

## Ads UI

If you monetize via video ads, custom UI isn't optional - the default controls genuinely don't have what you need. Typical requirements:

- **Skip Ad button with countdown.** Shows after N seconds (usually 5). Advertisers often have strict requirements on position, font size, and contrast - "must be visible and labeled" is a VAST requirement, and non-compliance can kill ad revenue.
- **Interaction blocking.** Seekbar disabled during ads (IAB guidelines). Pause sometimes blocked depending on ad deal. Volume usually allowed.
- **Different UI per ad phase.** Pre-roll, mid-roll, and post-roll may have different visuals, different overlays, different transition animations back to content.
- **Separate ad progress indicator.** You want a distinct bar for the ad itself so it doesn't pollute the content progress bar - otherwise users see the main seekbar reset mid-video and get confused.
- **Learn More / CTA overlay.** Click tracking hooks into Google IMA's click handling. Get the event wiring wrong and your advertiser reports zero clicks.

Google IMA event wiring into custom UI is non-trivial on its own - VAST alone has hundreds of edge cases across ad servers and creatives.

## Subtitles and audio tracks UI

A few things worth thinking about beyond "render a list":

- **Settings menu architecture.** Bottom sheet vs. modal, single-level vs. nested menu. Depends on how many options you expose (just subtitles and audio? also quality, speed, chapters?) and your design density. Bottom sheets work well on mobile; tablet often wants a popover.
- **Subtitle rendering: JS vs. native.** As discussed in [*When JavaScript isn't enough*](#when-javascript-isnt-enough), you choose between a JS parser (full styling control, heavy edge-case surface) and a thin native module (less code, rock solid, less flexibility). For most products, native.
- **Audio track switching.** Mid-playback switching on Android ExoPlayer can cause brief audio glitches; a clean switch usually requires native-side renderer pre-buffering. This is not fixable in JS - if audio switching is a core feature, plan for a native tweak.
- **Custom subtitle styling.** Font, background color, outline, position, size. Hearing-impaired users have concrete requirements; FCC/WCAG standards for closed captions apply if you ship to the US (21st Century Communications Act).

**Related:** [VideoView props](../video-view/props) · [Player events](../player/events)

## Buffering, loading, and error states

From the user's perspective, these are three different situations - and they need three different UIs:

- **Initial load** - spinner, optionally on top of a poster frame. Never a black screen.
- **Seek-in-progress** - brief indicator on the seekbar thumb (Android especially, see earlier section).
- **Mid-playback stall** - the video was playing, now it's not, network is struggling. Different visual from initial load: users know content exists, they want reassurance it's coming back.

:::tip Delay before showing the spinner
Don't show the buffering indicator immediately. A short delay (e.g. 200ms) prevents flickering when buffering resolves almost instantly - which happens often on fast connections or during short seeks. Without the delay, users see a spinner flash on every seek and it feels broken.
:::

Other things to handle:

- **Retry UI on error.** After a network failure, offer a "Try again" button. Don't just show a black screen with a cryptic error code.
- **Network quality indicator.** Optional but appreciated in streaming products (think Learnn). A subtle chevron or badge showing current bitrate tier.
- **"Tap to unmute" overlay.** iOS Safari and Chrome's autoplay policies force muted autoplay for feeds and auto-playing cards. After first user tap, unmute and hide the overlay.

## Accessibility

Easy to forget, easy to get wrong, impossible to retrofit. Things that matter:

- **VoiceOver / TalkBack labels.** Every button needs `accessibilityLabel`, and it must change with state - "Play" and "Pause" are different labels on the same button.
- **Focus management.** Hardware keyboard, tvOS Siri Remote, Android TV d-pad. A completely different input paradigm from touch - focus rings, directional navigation, no hover. If you ship to TV, plan to build a separate focus layer.
- **Minimum touch targets.** 44×44pt (iOS HIG), 48×48dp (Material). Designers will push back; hold the line.
- **Reduced motion.** `AccessibilityInfo.isReduceMotionEnabled()`. Your Reanimated transitions should respect this - snap instead of animate when the user has it on.

## Shipping it

Custom video UI is a significant investment. The rabbit holes in this guide - seekbar, gestures, fullscreen, PiP, ads, accessibility - add up fast. Many teams underestimate the scope because the first 80% goes quickly; it's the remaining 20% (platform edge cases, gesture conflicts, native integrations) that eats the timeline.

We maintain `react-native-video` and know every edge case in the codebase. If your timeline doesn't have room for a multi-week build, or you want expert help shipping faster, we can help.

:::tip Need a production-grade custom video UI?
Our team maintains `react-native-video` and has shipped player UIs for streaming, education, and enterprise clients. [Request a custom UI →](https://sdk.thewidlarzgroup.com/ask-for-plugin?contact=true)
:::
