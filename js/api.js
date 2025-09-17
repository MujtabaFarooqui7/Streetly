class APIManager {
  constructor() {
    this.mockData = {
      weather: {
        "New York": { temperature: 22, condition: "Sunny" },
        Paris: { temperature: 18, condition: "Cloudy" },
        Tokyo: { temperature: 25, condition: "Clear" },
        London: { temperature: 15, condition: "Rainy" },
        Barcelona: { temperature: 28, condition: "Clear" },
        Amsterdam: { temperature: 16, condition: "Cloudy" },
        Berlin: { temperature: 19, condition: "Sunny" },
        Sydney: { temperature: 20, condition: "Rainy" },
        Rome: { temperature: 26, condition: "Sunny" },
        Bangkok: { temperature: 32, condition: "Rainy" },
        Dubai: { temperature: 35, condition: "Sunny" },
        "Mexico City": { temperature: 24, condition: "Cloudy" },
        "Rio de Janeiro": { temperature: 28, condition: "Rainy" },
        Cairo: { temperature: 30, condition: "Clear" },
        Moscow: { temperature: 10, condition: "Cloudy" },
        Toronto: { temperature: 17, condition: "Sunny" },
        Singapore: { temperature: 31, condition: "Rainy" },
        Seoul: { temperature: 20, condition: "Clear" },
      },
      cityInfo: {
        "New York": { population: "8.4M", language: "English" },
        Paris: { population: "2.1M", language: "French" },
        Tokyo: { population: "14M", language: "Japanese" },
        London: { population: "8.9M", language: "English" },
        Barcelona: { population: "1.6M", language: "Spanish" },
        Amsterdam: { population: "872K", language: "Dutch" },
        Berlin: { population: "3.7M", language: "German" },
        Sydney: { population: "5.3M", language: "English" },
        Rome: { population: "2.8M", language: "Italian" },
        Bangkok: { population: "8.2M", language: "Thai" },
        Dubai: { population: "3.1M", language: "Arabic, English" },
        "Mexico City": { population: "8.9M", language: "Spanish" },
        "Rio de Janeiro": { population: "6.7M", language: "Portuguese" },
        Cairo: { population: "9.8M", language: "Arabic" },
        Moscow: { population: "12.6M", language: "Russian" },
        Toronto: { population: "2.9M", language: "English" },
        Singapore: { population: "5.7M", language: "English, Malay, Mandarin" },
        Seoul: { population: "9.7M", language: "Korean" },
      },
      mapData: {
        "New York": {
          center: [40.758, -73.985],
          famousPlaces: [
            {
              lat: 40.7484,
              lon: -73.9857,
              name: "Empire State Building",
              description: "A famous skyscraper with an observation deck.",
            },
            {
              lat: 40.7831,
              lon: -73.9712,
              name: "Central Park",
              description: "Vast urban park, home to many attractions.",
            },
            {
              lat: 40.7128,
              lon: -74.006,
              name: "Statue of Liberty",
              description: "Iconic symbol of freedom and democracy.",
            },
          ],
          foodRecommendations: [
            {
              lat: 40.7589,
              lon: -73.9865,
              name: "Joe's Pizza",
              description: "Classic New York slice.",
            },
            {
              lat: 40.7618,
              lon: -73.9822,
              name: "Pastrami Queen",
              description: "Legendary pastrami sandwiches.",
            },
          ],
          safeRoute: [
            [40.7589, -73.9865],
            [40.7584, -73.9857],
            [40.7618, -73.9822],
          ],
        },
        Paris: {
          center: [48.8584, 2.2945],
          famousPlaces: [
            {
              lat: 48.8584,
              lon: 2.2945,
              name: "Eiffel Tower",
              description: "Iconic wrought-iron lattice tower.",
            },
            {
              lat: 48.8606,
              lon: 2.3376,
              name: "Louvre Museum",
              description:
                "World's largest art museum and a historic monument.",
            },
          ],
          foodRecommendations: [
            {
              lat: 48.8566,
              lon: 2.3522,
              name: "Le Bouillon Chartier",
              description: "Classic French brasserie.",
            },
            {
              lat: 48.8647,
              lon: 2.351,
              name: "L'As du Fallafel",
              description: "Famous falafel spot in Le Marais.",
            },
          ],
          safeRoute: [
            [48.8584, 2.2945],
            [48.8606, 2.3376],
            [48.8566, 2.3522],
          ],
        },
        Tokyo: {
          center: [35.6895, 139.6917],
          famousPlaces: [
            {
              lat: 35.7148,
              lon: 139.7967,
              name: "Senso-ji",
              description: "Ancient Buddhist temple.",
            },
            {
              lat: 35.6591,
              lon: 139.7018,
              name: "Shibuya Crossing",
              description: "World's busiest intersection.",
            },
          ],
          foodRecommendations: [
            {
              lat: 35.6666,
              lon: 139.7317,
              name: "Tsukiji Outer Market",
              description: "Famous for fresh seafood.",
            },
            {
              lat: 35.6744,
              lon: 139.7617,
              name: "Ramen Street",
              description: "A collection of popular ramen shops.",
            },
          ],
          safeRoute: [
            [35.6895, 139.6917],
            [35.6591, 139.7018],
            [35.6666, 139.7317],
          ],
        },
      },
      popularPlaces: {
        "New York": [
          {
            name: "Central Park",
            description: "Vast urban park with many attractions.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=Central+Park",
            price: "$1,100",
            rating: "5.0",
          },
          {
            name: "Statue of Liberty",
            description: "Iconic symbol of freedom and democracy.",
            image:
              "https://via.placeholder.com/400x300/4b5563/ffffff?text=Statue+of+Liberty",
            price: "$1,200",
            rating: "4.8",
          },
          {
            name: "Maldives",
            description:
              "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
            image:
              "https://via.placeholder.com/400x300/fcd34d/000000?text=Maldives",
            price: "$3,000",
            rating: "5.0",
          },
          {
            name: "Toronto",
            description:
              "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
            image:
              "https://via.placeholder.com/400x300/34d399/ffffff?text=Toronto",
            price: "$3,500",
            rating: "4.6",
          },
        ],
        Paris: [
          {
            name: "Eiffel Tower",
            description: "Wrought-iron lattice tower on the Champ de Mars.",
            image:
              "https://via.placeholder.com/400x300/fcd34d/000000?text=Eiffel+Tower",
            price: "$900",
            rating: "4.9",
          },
          {
            name: "Louvre Museum",
            description: "World's largest art museum and a historic monument.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=Louvre+Museum",
            price: "$1,050",
            rating: "4.7",
          },
        ],
        Tokyo: [
          {
            name: "Senso-ji Temple",
            description: "Ancient Buddhist temple in Asakusa.",
            image:
              "https://via.placeholder.com/400x300/4b5563/ffffff?text=Senso-ji+Temple",
            price: "$1,500",
            rating: "4.8",
          },
          {
            name: "Shibuya Crossing",
            description: "One of the most famous pedestrian crossings.",
            image:
              "https://via.placeholder.com/400x300/fcd34d/000000?text=Shibuya+Crossing",
            price: "$1,600",
            rating: "5.0",
          },
        ],
        London: [
          {
            name: "Tower of London",
            description:
              "Historic castle on the north bank of the River Thames.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=Tower+of+London",
            price: "$850",
            rating: "4.7",
          },
          {
            name: "Buckingham Palace",
            description:
              "London residence and administrative headquarters of the monarch.",
            image:
              "https://via.placeholder.com/400x300/4b5563/ffffff?text=Buckingham+Palace",
            price: "$950",
            rating: "4.6",
          },
        ],
        Dubai: [
          {
            name: "Burj Khalifa",
            description: "The world's tallest building.",
            image:
              "https://via.placeholder.com/400x300/10b981/ffffff?text=Burj+Khalifa",
            price: "$2,500",
            rating: "5.0",
          },
          {
            name: "The Dubai Mall",
            description: "One of the world's largest shopping malls.",
            image:
              "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Dubai+Mall",
            price: "$2,200",
            rating: "4.9",
          },
        ],
      },
    };
  }

  getWeather(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.mockData.weather[city] || {
            temperature: "?",
            condition: "Unknown",
          }
        );
      }, 500);
    });
  }

  getCityInfo(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.mockData.cityInfo[city] || { population: "?", language: "?" }
        );
      }, 500);
    });
  }

  getChatResponse(message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes("best restaurants")) {
          resolve("The best restaurants are the ones you discover yourself!");
        } else if (lowerCaseMessage.includes("things to do")) {
          resolve(
            "There are countless things to do. What are you in the mood for?"
          );
        } else if (lowerCaseMessage.includes("getting around")) {
          resolve(
            "The public transport is very efficient. Consider using the metro or bus."
          );
        } else if (lowerCaseMessage.includes("hidden gems")) {
          resolve(
            "The city is full of hidden gems. Just wander off the main streets to find them."
          );
        } else {
          resolve(
            "I'm sorry, I don't have information on that topic yet. Please try asking about a different topic."
          );
        }
      }, 1500);
    });
  }

  getMapData(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockData.mapData[city]);
      }, 1000);
    });
  }

  getPopularPlaces(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockData.popularPlaces[city] || []);
      }, 1000);
    });
  }
}
