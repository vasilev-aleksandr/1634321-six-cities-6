export const UpdateHousingValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  city: {
    invalid: 'city must be one of these: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  preview: {
    maxLength: 'Too short for field «image»',
  },
  images: {
    invalidFormat: 'Field images must be an array',
    maxLength: 'Too long for images',
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be a true or false',
  },
  housingType: {
    invalid: 'housingType must be one of these: apartment, house, room, hotel',
  },
  rooms: {
    invalidFormat: 'Rooms must be an integer',
    minValue: 'Minimum rooms is 1',
    maxValue: 'Maximum rooms is 8',
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: 'Minimum guests is 1',
    maxValue: 'Maximum guests is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  features: {
    invalidFormat: 'Field features must be an array including any of these: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  location: {
    invalidFormat: 'Field coordinates must be an object',
    invalidLatitude: 'Latitude must be a valid number',
    invalidLongitude: 'Longitude must be a valid number'
  }
};
