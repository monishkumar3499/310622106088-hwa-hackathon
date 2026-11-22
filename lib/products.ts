export const PRODUCTS = [
  {
    id: "doggy-dera",
    name: "Doggy Dera",
    price: 3999,
    shortDescription:
      "The everyday tent home for working pet parents. Three corners: sleeping, eating, play. Mesh windows for airflow. Custom colour, print, size and name stitched on the door. Delivered in 3-5 days.",
    description:
      "The everyday tent home for working pet parents. It has three corners - a soft washable sleeping corner, an eating corner with a dry food feeder and a 3-litre steel water tank that refills the bowl, and a play corner with chew toys and a snuffle mat to hide treats in. Mesh windows keep air flowing. Choose its colour, print and size, and have your dog's name stitched on the door. Delivered in 3-5 days.",
    image: "/images/doggy dera pic.png",
    images: [
      "/images/doggy dera pic.png",
      "/images/doggy dera pic.png",
      "/images/doggy dera pic.png",
    ],
    features: [
      "Soft, washable sleeping corner",
      "Eating corner with dry food feeder",
      "3-litre steel water tank that refills the bowl",
      "Play corner with chew toys and snuffle mat",
      "Mesh windows for airflow",
      "Custom colour, print and size",
      "Dog's name stitched on the door",
      "Delivered in 3-5 days",
    ],
    customizable: true,
  },
  {
    id: "maharaja-dera",
    name: "Maharaj Dera",
    price: 7999,
    shortDescription:
      "The royal version. Everything in Doggy Dera, plus battery fan & cooling gel mat, heated pad, AI camera with alerts, key-holder calls, and trip mode.",
    description:
      "The royal version for pet parents who want peace of mind. It has everything in Doggy Dera, plus: automatic comfort - a battery fan and cooling gel mat for heat, and a heated pad for cold, which switch on only when needed; an AI camera linked to the Happy While Away app, which sends Low, Moderate and High alerts; key-holder calls - High alerts also call the neighbour or relative who has your key; trip mode covers 2-7 days away with a daily visitor check-in.",
    image: "/images/maharaj dera pic.png",
    images: [
      "/images/maharaj dera pic.png",
      "/images/maharaj dera pic.png",
      "/images/maharaj dera pic.png",
    ],
    features: [
      "Everything in Doggy Dera",
      "Battery fan and cooling gel mat for heat",
      "Heated pad for cold, switches on only when needed",
      "AI camera linked to the Happy While Away app",
      "Low, Moderate and High alerts",
      "Key-holder calls on High alerts",
      "Trip mode for 2-7 days with daily visitor check-in",
    ],
    customizable: true,
    appPlan: {
      name: "Happy While Away App Plan",
      price: 149,
      interval: "/month",
      description: "Covers AI alerts, key-holder calls and trip mode.",
    },
  },
]

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}
