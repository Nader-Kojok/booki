import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faSearch,
  faCalendar,
  faMessage,
  faUser,
  faMapPin,
  faStar,
  faHeart,
  faShare,
  faFilter,
  faClock,
  faPhone,
  faFootball,
  faTableTennis,
  faVolleyball,
  faBasketball,
  faLocationDot,
  faBell,
  faCloudSun,
  faFire,
  faEye,
  faStarHalfStroke,
  faWifi,
  faParking,
  faShower,
  faUsers,
  faShield,
  faCreditCard,
  faQrcode,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faBars,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faPlus,
  faMinus,
  faEdit,
  faTrash,
  faUpload,
  faCopy
} from '@fortawesome/free-solid-svg-icons'

// Add all icons to the library
library.add(
  // Navigation
  faHome, faSearch, faCalendar, faMessage, faUser,
  // Location & Maps
  faMapPin, faLocationDot,
  // Actions
  faStar, faHeart, faShare, faFilter, faEye,
  // Time & Communication
  faClock, faPhone, faBell,
  // Sports
  faFootball, faTableTennis, faVolleyball, faBasketball,
  // Weather & Environment
  faCloudSun, faFire,
  // Ratings
  faStarHalfStroke,
  // Amenities
  faWifi, faParking, faShower, faUsers, faShield,
  // Payment & Booking
  faCreditCard, faQrcode,
  // Status
  faCheckCircle, faTimesCircle, faSpinner,
  // UI Controls
  faBars, faTimes, faChevronLeft, faChevronRight, 
  faChevronDown, faChevronUp, faPlus, faMinus,
  // Actions
  faEdit, faTrash, faUpload, faCopy
)

export default library 