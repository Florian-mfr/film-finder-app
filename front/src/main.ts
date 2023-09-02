import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';

import { faCaretDown, faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

library.add(faCaretDown, fasStar, farStar, faStarHalfAlt);
/* add icons to the library */



createApp(App).mount('#app')
