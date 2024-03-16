<template>
    <main-header />
    <section class="hero__section">
      <div class="container">
        <div class="hero__content">
          <div class="drag-and-drop-container" v-show="currentSection === 'dragAndDrop' || isLargeScreen">
            <div class="drag-and-drop-container" v-show="showDragAndDrop">
            <DragAndDrop @start-processing="startProcess"/>
            </div>
            <product-preloader v-show="loading"> Cargando... </product-preloader>
            <div class="paper-container" v-show="showPaper">
          <div class="paper">
            <p style="white-space:pre-wrap">{{ paperText}}</p>
          </div>
          <div class="button-container">
    <!-- Speech button placed before the upload button -->
    <button class="readText" @click="readText"> <i class="fa" :class="!reproduce ? 'fa-volume-up' : 'fa-volume-mute'"></i></button>
    <button class="uploadMore" @click="uploadMore">Subir otro archivo</button>
  </div>
        </div>
      </div>
          <div class="empty-section" v-show="currentSection === 'emptySection' || isLargeScreen">
            <div class="empty-section-content">
              <div class="language-selector">
                <h3 for="language-select">Idiomas</h3>
                <select id="language-select" v-model="selectedLanguage">
                  <option value="es" selected>Español</option>
                  <option value="en" >English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Português</option>
                  <option value="ru">Русский</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              <hr class="separator" />
              <div class="action-label">
                <h3>¿Qué quiere hacer?</h3>
              </div>
              <div class="button-group">
                <button :class="{ selected: currentAction === 1 }" @click="currentAction = 1">Clarificar</button>
                <button :class="{ selected: currentAction === 2 }" @click="currentAction = 2">Analogía</button>
                <button :class="{ selected: currentAction === 3 }" @click="currentAction = 3">Destacar</button>
              </div>
              <hr class="separator" />
              <div class="history-label">
                <h3>Historial</h3>
              </div>
              <ul class="history-list">
                <li v-for="(item, index) in history" :key="index">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="toggle-menu" @click="toggleSection">{{ currentSection === 'emptySection'? "PLAYGROUND" : "PARAMETROS" }}</div>
  </template>
  
  <script>
  import MainHeader from "@/components/MainHeader.vue";
  import DragAndDrop from "@/components/playground_components/DragAndDrop.vue";
  import readImage from "@/apis/ocr";
  import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
  import translateText from "@/apis/translate";
  import chat from "@/apis/openai";

  
  export default {
    name: "HomeView",
    components: {
      MainHeader,
      DragAndDrop,
      ProductPreloader,
    },
    data() {
      return {
        currentSection: 'dragAndDrop',
        isLargeScreen: false,
        currentAction: 2,
        history: [], // Example history items
        showDragAndDrop: true, // Control visibility of the drag-and-drop component
        paperText: '', // Text to display on the simulated paper
        orginalText: '',
        showPaper: false, // Control visibility of the paper
        loading: false, // Control visibility of the preloader
        textFromImage: '',
        selectedLanguage: 'es',   
        reproduce : false, 
      };
    },
    methods: {
      toggleSection() {
        if (!this.isLargeScreen) {
          this.currentSection = this.currentSection === 'dragAndDrop' ? 'emptySection' : 'dragAndDrop';
        }
      },
      checkScreenSize() {
        this.isLargeScreen = window.innerWidth >= 768;
      },    readText() {
    const speech = new SpeechSynthesisUtterance(this.paperText);
    speech.lang = this.selectedLanguage;
    if (!this.reproduce) {
        window.speechSynthesis.speak(speech);
        this.reproduce = true;
    }else{
        window.speechSynthesis.cancel();
        this.reproduce = false;

    }
},
    uploadMore() {
        this.showDragAndDrop = true;
        this.showPaper = false;

        // Reset or handle additional file uploads as needed
    },
    async startProcess(files) {
  // Ensure there's at least one file and it's an image
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    this.loading = true;
    this.showDragAndDrop = false;
    this.showPaper = false;
    console.log('Processing file:', files[0].name);
    console.log(this.loading);

    
    this.history.push(files[0].name);

    // Perform OCR on the image
    try {
        
      readImage(files[0]).then((res) => {
                this.textFromImage = res;
                const r = chat(res, this.currentAction).then((res) => {
                    console.log(res);
                    this.showPaper = true;
                    this.loading = false;
                    this.paperText = res;
                    this.orginalText = res;
                    return res;
                });
                return res;
        });

        
    } catch (error) {
      console.error('Error reading text from image:', error);
      this.paperText = 'Error reading text from image.';
    }
  } else {
    // Handle non-image files or no file case
    console.log('Uploaded file is not an image or no file was uploaded');
  }
},
    },
    mounted() {
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkScreenSize);
    },
    watch: {
    // The property name 'watchedVariable' matches the name of the data property we want to watch
    currentAction(newVal, oldVal) {
      if (this.textFromImage !== '') {
        this.loading = true;
        this.showPaper = false;
        chat(this.textFromImage, newVal).then((res) => {
          this.showPaper = true;
          this.loading = false;
          this.orginalText = res;
          this.paperText = res;
        });
      }
    },
    selectedLanguage(newVal, oldVal) {
        if (this.orginalText!== '') {
        this.loading = true;
        this.showPaper = false;
        translateText(this.orginalText, newVal).then((res) => {
          this.showPaper = true;
          this.loading = false;
          this.paperText = res;
        });
      }
      },
  },

  };
  </script>
  
  <style scoped>
  /* General Styles */
  .hero__section, .hero__content, .toggle-menu{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .drag-and-drop-container, .empty-section {
    display: flex;
    justify-content: center;

  }

  .hero__section {
    height: calc(100vh - 65px);
    background-position: center;
    background-size: cover;
  }
  
  .hero__content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  
  .toggle-menu {
    display: none;
    position: fixed;
    height: 5vh;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 10px;
    background-color: #ddd;
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .hero__content {
      flex-direction: row;
    }
  
    .drag-and-drop-container {
      width: 70%;
    }
  
    .empty-section {
      width: 30%;

      background-color: #f0f0f0;
    }
  }
  
  @media (max-width: 767px) {
    .hero__content {
      flex-direction: column;
    }
  
    .toggle-menu {
      display: block;
    }
  }
  
  /* Empty Section Styles */

  .empty-section {
    height: calc(100vh - 65px);
  }


  

  .empty-section-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .separator {
    width: 100%;
    border: none;
    height: 1px;
    background-color: grey;
    margin: 20px 0;
  }
  
  .history-list {
    list-style: none;
    padding: 0;
    width: 100%;
  }
  
  .history-list li {
    text-align: center;
    padding: 10px;
    border-bottom: 2px solid #ccc;
    font-size: 1rem;
  }
  
  .language-selector h3, .action-label h3, .history-label h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
    text-align: center;
  }
  
  .language-selector select, .button-group button {
    padding: 10px 20px;
    margin: 0 5px;
    border: 2px solid #007bff;
    border-radius: 5px;
    background-color: #e7e7e7;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-weight: bold;
  }
  
  .button-group button:hover, .button-group .selected {
    background-color: #007bff;
    color: white;
  }

  .button-group {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the gap size as needed */
}

.paper-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%; /* Ensure the container takes full width */
}

.paper {
  width: 100%; /* Make the paper take full width of its container */
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  margin-bottom: 10px; /* Adjust margin to separate from buttons */
}

button.readText {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 24px;
  padding: 10px; /* Add padding for a larger touch area */
  margin-right: 10px; /* Add margin to separate from the upload button */
  
}

button.uploadMore {
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-weight: bold;
}

button.uploadMore:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
  align-items: center; /* Align the buttons vertically */
  gap: 10px; /* Add space between the buttons */
}
  </style>