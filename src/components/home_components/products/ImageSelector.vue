<template>
  <div class="image-select-container">
    <h3 class="title">{{ title }}</h3>
    <div class="images">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-container"
        :class="{ 'selected': isSelected(index) }"
        @click="toggleSelection(index)"
      >
        <img :src="image.url" :alt="`Image ${index + 1}`" class="image"/>
      </div>
    </div>
    <button class="actionButton" @click="next" >NEXT</button>
  </div>
</template>

<script>
export default {
  name: 'ImageSelectComponent',
  props: {
    title: String,
    imagesList: {
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
      images: this.imagesList,
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
      this.$emit('updateSelection', this.selectedIndices.map(i => this.images[i]));
    },
    isSelected(index) {
      return this.selectedIndices.includes(index);
    },
    next(){
      this.$emit('next', "nextProduct");
    }
  }
}
</script>

<style scoped>
.image-select-container {
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

.images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent; /* No border by default */
}

.image-container.selected {
  border-color: #218838; /* Green border for selected images */
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.actionButton {
  background-color: var(--dark-green);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.7rem;
  cursor: pointer;
  margin-top: 20px;
}
</style>