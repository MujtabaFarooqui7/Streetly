// Main app logic for StreetSmart
class StreetSmartApp {
  constructor() {
    this.currentCity = null;
    this.currentView = "citySelection";
    this.chatManager = null;
    this.apiManager = null;
    this.map = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeManagers();
    this.updateLocalTime();

    setInterval(() => this.updateLocalTime(), 60000);
  }

  setupEventListeners() {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    const cityInput = document.getElementById("cityInput");
    if (cityInput) {
      cityInput.addEventListener("input", (e) => this.handleCitySearch(e));
      cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.selectCity(e.target.value);
        }
      });
    }

    document.querySelectorAll(".popular-city").forEach((btn) => {
      btn.addEventListener("click", () => {
        const city = btn.dataset.city;
        this.selectCity(city);
      });
    });

    const changeCityBtn = document.getElementById("changeCityBtn");
    if (changeCityBtn) {
      changeCityBtn.addEventListener("click", () => this.showCitySelection());
    }

    document.querySelectorAll(".quick-action").forEach((btn) => {
      btn.addEventListener("click", () => {
        const question = btn.textContent.trim();
        this.chatManager.sendMessage(question);
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !e.target.closest("#cityInput") &&
        !e.target.closest("#cityDropdown")
      ) {
        this.hideCityDropdown();
      }
    });
  }

  initializeManagers() {
    this.apiManager = new APIManager();
    this.chatManager = new ChatManager(this.apiManager);
  }

  switchView(view) {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove(
        "active",
        "text-primary",
        "border-b-2",
        "border-primary"
      );
      btn.classList.add("text-gray-500", "hover:text-primary");
    });
    const activeBtn = document.querySelector(`.nav-btn[data-view="${view}"]`);
    if (activeBtn) {
      activeBtn.classList.add(
        "active",
        "text-primary",
        "border-b-2",
        "border-primary"
      );
      activeBtn.classList.remove("text-gray-500", "hover:text-primary");
    }

    document
      .querySelectorAll(".screen")
      .forEach((screen) => screen.classList.add("hidden"));

    if (view === "chat") {
      if (this.currentCity) {
        document.getElementById("chatInterface").classList.remove("hidden");
      } else {
        document
          .getElementById("citySelectionScreen")
          .classList.remove("hidden");
      }
    } else if (view === "explore") {
      if (this.currentCity) {
        document.getElementById("exploreInterface").classList.remove("hidden");
        this.initializeMap();
        this.loadExploreContent();
      } else {
        document
          .getElementById("citySelectionScreen")
          .classList.remove("hidden");
      }
    } else if (view === "events") {
      document.getElementById("eventsInterface").classList.remove("hidden");
      this.loadLocalEvents();
    }

    this.currentView = view;
  }

  async handleCitySearch(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
      this.hideCityDropdown();
      return;
    }
    this.showCityDropdown(await this.getCitySuggestions(query));
  }

  async getCitySuggestions(query) {
    const cities = [
      "New York",
      "Paris",
      "Tokyo",
      "London",
      "Barcelona",
      "Amsterdam",
      "Berlin",
      "Sydney",
      "Rome",
      "Bangkok",
    ];
    return cities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }

  showCityDropdown(suggestions) {
    const dropdown = document.getElementById("cityDropdown");
    if (!dropdown) return;
    dropdown.innerHTML = "";
    if (suggestions.length === 0) {
      dropdown.classList.add("hidden");
      return;
    }
    suggestions.forEach((city) => {
      const div = document.createElement("div");
      div.className = "city-suggestion";
      div.textContent = city;
      div.addEventListener("click", () => this.selectCity(city));
      dropdown.appendChild(div);
    });
    dropdown.classList.remove("hidden");
  }

  hideCityDropdown() {
    const dropdown = document.getElementById("cityDropdown");
    if (dropdown) dropdown.classList.add("hidden");
  }

  async selectCity(cityName) {
    if (!cityName) return;
    this.showLoading();
    try {
      this.currentCity = cityName;
      document.getElementById("currentCity").textContent = cityName;
      const cityInput = document.getElementById("cityInput");
      if (cityInput) cityInput.value = "";
      this.hideCityDropdown();
      await this.loadCityData(cityName);
      document.getElementById("citySelectionScreen").classList.add("hidden");
      document.getElementById("chatInterface").classList.remove("hidden");
      this.chatManager.sendWelcomeMessage(cityName);
    } catch (error) {
      console.error("Error selecting city:", error);
      this.showError("Failed to load city data. Please try again.");
    } finally {
      this.hideLoading();
    }
  }

  async loadCityData(cityName) {
    try {
      const weather = await this.apiManager.getWeather(cityName);
      this.updateWeatherDisplay(weather);
      const cityInfo = await this.apiManager.getCityInfo(cityName);
      this.updateCityInfo(cityInfo);
    } catch (error) {
      console.error("Error loading city data:", error);
    }
  }

  updateWeatherDisplay(weather) {
    const weatherInfo = document.getElementById("weatherInfo");
    if (!weatherInfo || !weather) return;
    weatherInfo.innerHTML = `
            <div class="text-3xl mb-2">${this.getWeatherEmoji(
              weather.condition
            )}</div>
            <div class="text-2xl font-bold text-gray-900">${
              weather.temperature
            }°C</div>
            <div class="text-gray-600">${weather.condition}</div>
        `;
  }

  getWeatherEmoji(condition) {
    const map = {
      sunny: "☀️",
      cloudy: "☁️",
      rainy: "🌧️",
      snowy: "❄️",
      clear: "☀️",
    };
    return map[condition.toLowerCase()] || "🌤️";
  }

  updateCityInfo(cityInfo) {
    document.querySelector("#localTime").textContent =
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    document.querySelector(".font-medium:nth-of-type(2)").textContent =
      cityInfo.population;
    document.querySelector(".font-medium:nth-of-type(3)").textContent =
      cityInfo.language;
  }

  updateLocalTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timeElement = document.getElementById("localTime");
    if (timeElement) timeElement.textContent = timeString;
  }

  showCitySelection() {
    this.currentCity = null;
    document.getElementById("chatInterface").classList.add("hidden");
    document.getElementById("exploreInterface").classList.add("hidden");
    document.getElementById("eventsInterface").classList.add("hidden");
    document.getElementById("citySelectionScreen").classList.remove("hidden");
    this.chatManager.clearMessages();
  }

  async initializeMap() {
    if (!this.currentCity) return;
    if (this.map) {
      this.map.remove();
    }
    this.showLoading();
    const mapData = await this.apiManager.getMapData(this.currentCity);
    this.hideLoading();
    if (!mapData) {
      this.showError("Map data not available for this city.");
      return;
    }

    const { center, famousPlaces, foodRecommendations, safeRoute } = mapData;
    this.map = L.map("map").setView(center, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.addMarkers(famousPlaces, "famousPlace");
    this.addMarkers(foodRecommendations, "food");
    this.addRoute(safeRoute);
  }

  addMarkers(places, type) {
    const icon =
      type === "food" ? "fa-solid fa-utensils" : "fa-solid fa-landmark";
    const color = type === "food" ? "#10B981" : "#3B82F6";
    places.forEach((place) => {
      const customIcon = L.divIcon({
        html: `<div style="color: ${color}; font-size: 24px;"><i class="${icon}"></i></div>`,
        className: "custom-icon",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -12],
      });
      L.marker([place.lat, place.lon], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`<b>${place.name}</b><br>${place.description}`);
    });
  }

  addRoute(route) {
    if (route && route.length > 1) {
      L.polyline(route, {
        color: "#F59E0B",
        weight: 5,
        opacity: 0.8,
        dashArray: "10, 5",
      })
        .addTo(this.map)
        .bindPopup("This is a recommended short, safe route.");
    }
  }

  async loadExploreContent() {
    const exploreCityName = document.getElementById("exploreCityName");
    exploreCityName.textContent = this.currentCity;

    const placesGrid = document.getElementById("placesGrid");
    placesGrid.innerHTML = "";
    this.showLoading();
    const popularPlaces = await this.apiManager.getPopularPlaces(
      this.currentCity
    );
    this.hideLoading();
    if (popularPlaces && popularPlaces.length > 0) {
      popularPlaces.forEach((place) => {
        const card = this.createPlaceCard(place);
        placesGrid.appendChild(card);
      });
    } else {
      placesGrid.innerHTML =
        '<div class="col-span-full text-center text-gray-500">No popular places available for this city yet.</div>';
    }
  }

  createPlaceCard(place) {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md overflow-hidden";
    card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold text-gray-900">${place.name}</h3>
                <p class="text-gray-600 text-sm mt-1">${place.description}</p>
                <div class="mt-3 flex items-center justify-between text-sm">
                    <span class="text-primary font-bold">${place.price}</span>
                    <div class="flex items-center">
                        <i class="fas fa-star text-yellow-400 mr-1"></i>
                        <span>${place.rating}</span>
                    </div>
                </div>
            </div>
        `;
    return card;
  }

  async loadLocalEvents() {
    const eventsList = document.getElementById("eventsList");
    if (eventsList) {
      eventsList.innerHTML =
        '<div class="col-span-full text-center text-gray-500">Local events coming soon!</div>';
    }
  }

  showLoading() {
    const spinner = document.getElementById("loadingSpinner");
    if (spinner) spinner.classList.remove("hidden");
  }

  hideLoading() {
    const spinner = document.getElementById("loadingSpinner");
    if (spinner) spinner.classList.add("hidden");
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className =
      "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.streetSmartApp = new StreetSmartApp();
});
