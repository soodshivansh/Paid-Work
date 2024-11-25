import { FaGenderless, FaPaw, FaClock, FaPalette, FaWeightHanging, FaRulerVertical, FaFemale, FaTransgender } from 'react-icons/fa';

const mapPetToDetails = (pet) => [
  { icon: <FaTransgender />, label: "Gender", value: pet.gender },
  { icon: <FaPaw />, label: "Breed", value: pet.breed },
  { icon: <FaClock />, label: "Age", value: pet.age },
  { icon: <FaPalette />, label: "Color", value: pet.color },
  { icon: <FaWeightHanging />, label: "Weight", value: pet.weight },
  { icon: <FaRulerVertical />, label: "Height", value: pet.height },
];

export default mapPetToDetails;
