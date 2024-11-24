export const mapPetToDetails = (pet) => {
  return [
    {
      icon: "🐾",
      label: "Name",
      value: pet.name
    },
    {
      icon: "🐕",
      label: "Breed",
      value: pet.breed
    },
    {
      icon: "📅",
      label: "Age",
      value: pet.age || 'Not specified'
    },
    {
      icon: "⚥",
      label: "Gender",
      value: pet.gender
    },
    {
      icon: "📏",
      label: "Size",
      value: pet.size
    },
    {
      icon: "🎨",
      label: "Color",
      value: pet.color
    },
    {
      icon: "💉",
      label: "Vaccinated",
      value: pet.vaccinated ? "Yes" : "No"
    },
    {
      icon: "✂️",
      label: "Neutered",
      value: pet.neutered ? "Yes" : "No"
    },
    {
      icon: "🔍",
      label: "Microchipped",
      value: pet.microchipped ? "Yes" : "No"
    },
    {
      icon: "🏠",
      label: "House Trained",
      value: pet.houseTrained ? "Yes" : "No"
    },
    {
      icon: "📍",
      label: "Location",
      value: pet.location ? `${pet.location.city}, ${pet.location.state}, ${pet.location.country}` : "Not specified"
    }
  ];
};
