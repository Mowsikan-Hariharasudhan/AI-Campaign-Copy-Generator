import confetti from 'canvas-confetti';

/**
 * Trigger subtle celebratory confetti burst upon campaign generation
 */
export function fireConfetti() {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#2563EB', '#10B981', '#3B82F6', '#1E293B', '#F59E0B'],
      disableForReducedMotion: true
    });
  } catch (err) {
    // Graceful fallback if unsupported
  }
}
