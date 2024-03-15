<template>
  <div class="color-select-container">
    <h3 class="title">{{ title }}</h3>
    <div class="colors">
      <div
        v-for="(color, index) in colorsList"
        :key="index"
        class="color-container"
        :class="{ 'selected': isSelected(index) }"
        @click="toggleSelection(index)"
        :style="{ backgroundColor: color }"
      ></div>
    </div>
    <button class="actionButton" @click="next">NEXT</button>
  </div>
</template>

<script>
export default {
  name: 'ColorSelectComponent',
  props: {
    title: String,
    colors: {
      type: Array,
      default: () => []
    },
    maxSelect: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      colorsList: this.colors,
      selectedIndices: []
    }
  },
  methods: {
    toggleSelection(index) {
      const selectedIndex = this.selectedIndices.indexOf(index);
      if (selectedIndex !== -1) {
        this.selectedIndices.splice(selectedIndex, 1);
      } else {
        if (this.selectedIndices.length >= this.maxSelect) {
          this.selectedIndices.shift(); // Remove the oldest selected index
        }
        this.selectedIndices.push(index);
      }
      this.$emit('updateSelection', this.selectedIndices.map(i => this.colorsList[i]));
    },
    isSelected(index) {
      return this.selectedIndices.includes(index);
    },
    next() {
      console.log(this.colorsList);
      this.$emit('next', "nextProduct");
    }
  }
}
</script>
  
<style scoped>
.color-select-container {
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

.colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, 60px);
  gap: 20px; /* Reduced gap for a more compact layout */
  justify-content: center; /* Center the grid items */
  margin-top: 20px;
}

.color-container {
  width: 60px; /* Smaller size for a more minimalist design */
  height: 60px;
  cursor: pointer;
  border: 1px solid transparent; /* Subtler border */
  border-radius: 10px; /* Softer corners */
  border: 1px solid #000000; /* Black border for non-selected colors */
}

.color-container.selected {
  border-color: #218838; /* Green border for selected colors, kept for clarity */
}

.actionButton {
  background-color: var(--dark-green);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.5rem; /* Adjusted for minimalism */
  cursor: pointer;
  margin-top: 20px;
}
</style>