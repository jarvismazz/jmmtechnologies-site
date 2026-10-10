// Respect motion preferences. Native controls remain available for deliberate playback.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionPreviews = document.querySelectorAll('[data-motion-preview]');
function applyMotionPreference() {
  motionPreviews.forEach(video => {
    video.muted = true;
    if (motionPreference.matches) {
      video.autoplay = false;
      video.pause();
    } else {
      video.autoplay = true;
      video.play().catch(() => {}); // Browser autoplay policies may require Play.
    }
  });
}
applyMotionPreference();
motionPreference.addEventListener('change', applyMotionPreference);
