<template>
    <div class="file-upload-container">
      <div class="upload-area" 
           :class="{'file-hover': isHovering, 'upload-complete-area': fileUploaded}" 
           @dragover.prevent="onDragOver" 
           @dragenter.prevent="onDragEnter" 
           @dragleave.prevent="onDragLeave" 
           @drop.prevent="onFileDrop">
        <i class="fa fa-cloud-upload-alt upload-icon" v-if="!fileUploaded"></i>
        <p class="upload-instructions" v-if="!fileUploaded">Drag & Drop files here or</p>
        <button class="browse-files-btn" v-if="!fileUploaded" @click="triggerFileInput">Browse Files</button>
        <input type="file" ref="fileInput" @change="handleFiles" style="display: none;" multiple>
        <div v-if="fileUploaded" class="upload-complete-message">
          <i class="fa fa-check-circle upload-complete-icon"></i>
          <p>File(s) uploaded successfully!</p>
          <div class="button-group">
      <button class="action-btn remove-file-btn" @click="removeFile">Remove File</button>
      <button class="action-btn start-btn" @click="startProcess">Start</button>
    </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileUploaded: false,
        isHovering: false,
        uploadedFiles: [], // To store the uploaded files
      };
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleFiles(event) {
        const files = event.target.files || event.dataTransfer.files;
        if (files.length > 0) {
          this.fileUploaded = true;
          this.uploadedFiles = files; // Store the uploaded files
        }
        console.log(files);
      },
      onDragOver(event) {
        event.preventDefault();
      },
      onDragEnter(event) {
        this.isHovering = true;
      },
      onDragLeave(event) {
        this.isHovering = false;
      },
      onFileDrop(event) {
        this.isHovering = false;
        this.handleFiles(event);
      },
      removeFile() {
        this.fileUploaded = false;
        this.uploadedFiles = []; // Clear the uploaded files
        // Optionally, reset the file input
        this.$refs.fileInput.value = '';
      },
      startProcess() {
        // Implement the logic to start processing the uploaded files

        this.$emit('start-processing', this.uploadedFiles);
        this.fileUploaded = false;
      }
    }
  };
  </script>
  

<style scoped>

.remove-file-btn, .start-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.remove-file-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.start-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.upload-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.file-hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-color: #000;
}

.upload-complete-area {
  background-color: rgba(0, 255, 0, 0.1);
}

.upload-complete-icon {
  font-size: 48px;
  color: #4CAF50;
}

.upload-complete-message p {
  font-size: 18px;
  color: #333;
}
.file-upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  width: 300px;
  margin: auto;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upload-icon {
  font-size: 24px;
  color: #aaa;
}

.upload-instructions {
  margin: 10px 0;
  color: #555;
}

.browse-files-btn {
  background: linear-gradient(to bottom, #e0e0e0 0%, #cecece 100%);
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.browse-files-btn:hover {
  background: linear-gradient(to bottom, #d0d0d0 0%, #bcbcbc 100%);
}

/* ... existing styles ... */

.browse-files-btn, .action-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  color: #333;
  transition: background-color 0.3s ease;
}

.browse-files-btn:hover, .action-btn:hover {
  background-color: #e0e0e0;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.remove-file-btn {
  background-color: #fddfdf; /* Pastel red */
  border-color: #fbc2c4;
  border-radius: 20px;
}

.start-btn {
  background-color: #d3f9d8; /* Pastel green */
  border-color: #a2f5a2;
  border-radius: 20px;
}
</style>