<template>
  <span
    class="highlight-text"
    ref="textContainer"
    :style="alignment === 'center' ? 'justify-content: center' : null"
  >
    <span
      v-for="(word, wordIndex) in words"
      :key="`word-${wordIndex}`"
      class="wave-text-word"
    >
      <span
        v-for="(char, charIndex) in word.split('')"
        :key="`char-${wordIndex}-${charIndex}`"
        class="highlight-text--char"
        :style="{
          animationDelay: `${(wordIndex * word.length + charIndex) * 0.05}s`,
          '--highlight-color':
            appConfig.colorSwatches[
              (wordIndex * word.length + charIndex) %
                appConfig.colorSwatches.length
            ].hex,
        }"
        @animationend="onCharAnimationEnd(wordIndex * word.length + charIndex)"
      >
        {{ char }}
      </span>
      <span v-if="wordIndex < words.length - 1" />
    </span>
  </span>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const appConfig = useAppConfig();

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  alignment: String,
});

const emit = defineEmits(["animationFinished"]);

const textContainer = ref(null);
const words = computed(() => props.text.split(" "));
const totalChars = computed(() => props.text.replace(/\s/g, "").length);
let animatedCharsCount = 0;

const onCharAnimationEnd = (charIndex) => {
  animatedCharsCount++;
  if (animatedCharsCount === totalChars.value) {
    emit("animationFinished");
  }
};

onMounted(() => {
  const chars = textContainer.value.querySelectorAll(".highlight-text--char");
  const totalDuration = chars.length * 0.8;

  chars.forEach((char) => {
    char.style.animationDuration = `${totalDuration}s`;
    char.style.animationFillMode = "forwards";
    char.offsetHeight;
    char.style.animationPlayState = "running";
  });
});
</script>

<style scoped>
.highlight-text {
  display: flex;
  gap: 0 var(--mvpb-spacing-6);
  flex-wrap: wrap;
}

.highlight-text--char {
  opacity: 0;
  color: var(--mvpb-color-light);
  animation: highlightSequence linear paused;
}

.wave-text-word {
  display: flex;
}

@keyframes highlightSequence {
  0% {
    opacity: 0;
    scale: 2.5;
    color: var(--mvpb-color-light);
  }
  5%,
  100% {
    opacity: 1;
    scale: 1;
    color: var(--highlight-color);
  }
}
</style>
