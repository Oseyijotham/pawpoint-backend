const { CAT_AND_DOG_API_KEY, OVERTUREMAPS_API_KEY } = process.env;

export function fetchBreeds() {
  return fetch("https://api.thecatapi.com/v1/breeds", {
    method: "GET",
    headers: {
      "x-api-key":
        "live_veNZdtcwPdxTq8JCOCN8dW0LvRfMhLJHM4uZOHDCWDC5ve8GaIeqqX5Y2CT6lrKI",
    },
  });
}

export function fetchCatByBreed(identifier) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${identifier}`,
    {
      method: "GET",
      headers: {
        "x-api-key":
          "live_veNZdtcwPdxTq8JCOCN8dW0LvRfMhLJHM4uZOHDCWDC5ve8GaIeqqX5Y2CT6lrKI",
      },
    }
  );
}

export function fetchCatPics() {
  return fetch("https://api.thecatapi.com/v1/images/search?limit=10", {
    method: "GET",
    headers: {
      "x-api-key": CAT_AND_DOG_API_KEY,
    },
  });
}

export function fetchMoreCatPics(pages) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&pages=${pages}`,
    {
      method: "GET",
      headers: {
        "x-api-key": CAT_AND_DOG_API_KEY,
      },
    }
  );
}

export function fetchDogPics() {
  return fetch("https://api.thedogapi.com/v1/images/search?limit=10", {
    method: "GET",
    headers: {
      "x-api-key": CAT_AND_DOG_API_KEY,
    },
  });
}

export function fetchMoreDogPics(pages) {
  return fetch(
    `https://api.thedogapi.com/v1/images/search?limit=10&pages=${pages}`,
    {
      method: "GET",
      headers: {
        "x-api-key": CAT_AND_DOG_API_KEY,
      },
    }
  );
}


export function fetchPlaces(category, country) {
  const formattedCategory = category.toLowerCase().replace(/\s+/g, "_");
  return fetch(
    `https://api.overturemapsapi.com/places?country=${country}&categories=${formattedCategory}`,
    {
      method: "GET",
      headers: {
        "x-api-key": OVERTUREMAPS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
}
