#!/bin/bash

echo "========================================="
echo "   WELLNESSOS PROJECT FIXER"
echo "========================================="
echo "This will rebuild your entire project with working code"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting project fix...${NC}"

# ============================================================
# 1. CREATE SERVICES DIRECTORY
# ============================================================
echo -e "${GREEN}Creating services...${NC}"
mkdir -p src/services

# ============================================================
# 2. CREATE FREE API SERVICE
# ============================================================
cat > src/services/freeApiService.js << 'SERVICECONTENT'
import axios from 'axios';

// ================================================================
// COMPLETE FREE WEATHER SERVICE - NO API KEYS
// ================================================================

// 1. Open-Meteo Weather API (Primary)
export const getWeatherOpenMeteo = async (location) => {
  try {
    const geoResponse = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`,
      { timeout: 5000 }
    );
    
    const results = geoResponse.data?.results || [];
    if (results.length === 0) return null;
    
    const { latitude, longitude, name, country } = results[0];
    
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=7`,
      { timeout: 10000 }
    );
    
    const airQualityResponse = await axios.get(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`,
      { timeout: 5000 }
    );
    
    const pollenResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto&forecast_days=7`,
      { timeout: 5000 }
    );
    
    return {
      location: { name, country, latitude, longitude },
      current: weatherResponse.data.current || {},
      hourly: weatherResponse.data.hourly || {},
      daily: weatherResponse.data.daily || {},
      airQuality: airQualityResponse.data || {},
      pollen: pollenResponse.data || {},
      raw: weatherResponse.data
    };
  } catch (error) {
    console.error('Open-Meteo error:', error.message);
    return null;
  }
};

// 2. Get complete weather data with all features
export const getCompleteWeatherData = async (location) => {
  if (!location || location.trim().length < 2) {
    return { error: 'Please enter a valid location name' };
  }
  
  try {
    const data = await getWeatherOpenMeteo(location);
    
    if (data && data.current) {
      const current = data.current;
      const daily = data.daily || {};
      const hourly = data.hourly || {};
      const airQuality = data.airQuality || {};
      const pollen = data.pollen || {};
      
      const hourlyData = [];
      if (hourly.time && hourly.temperature_2m) {
        for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
          hourlyData.push({
            time: hourly.time[i],
            temp: hourly.temperature_2m[i],
            humidity: hourly.relative_humidity_2m?.[i],
            precipitation: hourly.precipitation?.[i],
            windSpeed: hourly.wind_speed_10m?.[i],
            uvIndex: hourly.uv_index?.[i],
            weatherCode: hourly.weather_code?.[i] || 0
          });
        }
      }
      
      const dailyData = [];
      if (daily.time && daily.temperature_2m_max) {
        for (let i = 0; i < Math.min(7, daily.time.length); i++) {
          dailyData.push({
            date: daily.time[i],
            maxTemp: daily.temperature_2m_max[i],
            minTemp: daily.temperature_2m_min[i],
            weatherCode: daily.weather_code?.[i] || 0,
            uvIndex: daily.uv_index_max?.[i] || 0,
            sunrise: daily.sunrise?.[i] || '--:--',
            sunset: daily.sunset?.[i] || '--:--'
          });
        }
      }
      
      const uvIndex = current.uv_index || 0;
      const uvSafety = getUVSafety(uvIndex);
      
      const aqData = airQuality.current || {};
      const airQualityLevel = getAirQualityLevel(aqData.pm2_5 || 0);
      
      const pollenData = pollen.daily || {};
      const pollenLevel = getPollenLevel(
        pollenData.alder_pollen?.[0] || 0,
        pollenData.grass_pollen?.[0] || 0,
        pollenData.ragweed_pollen?.[0] || 0
      );
      
      const eclipseDates = getEclipseDates();
      
      return {
        source: 'Open-Meteo',
        location: data.location,
        weather: {
          temperature: current.temperature_2m || '--',
          feelsLike: current.apparent_temperature || '--',
          humidity: current.relative_humidity_2m || '--',
          windSpeed: current.wind_speed_10m || '--',
          condition: getWeatherCondition(current.weather_code || 0),
          weatherCode: current.weather_code || 0,
          uvIndex: uvIndex,
          uvSafety: uvSafety,
          precipitation: current.precipitation || 0,
          sunrise: dailyData[0]?.sunrise || '--:--',
          sunset: dailyData[0]?.sunset || '--:--'
        },
        hourly: hourlyData,
        daily: dailyData,
        airQuality: {
          pm25: aqData.pm2_5 || 0,
          pm10: aqData.pm10 || 0,
          o3: aqData.ozone || 0,
          no2: aqData.nitrogen_dioxide || 0,
          co: aqData.carbon_monoxide || 0,
          so2: aqData.sulphur_dioxide || 0,
          level: airQualityLevel
        },
        pollen: {
          alder: pollenData.alder_pollen?.[0] || 0,
          birch: pollenData.birch_pollen?.[0] || 0,
          grass: pollenData.grass_pollen?.[0] || 0,
          mugwort: pollenData.mugwort_pollen?.[0] || 0,
          olive: pollenData.olive_pollen?.[0] || 0,
          ragweed: pollenData.ragweed_pollen?.[0] || 0,
          level: pollenLevel
        },
        eclipses: eclipseDates,
        raw: data
      };
    }
    
    return { error: 'Unable to fetch weather data. Please try a different location.' };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return { error: 'Network error. Please check your connection.' };
  }
};

// UV Safety Levels
export const getUVSafety = (uvIndex) => {
  if (uvIndex <= 2) return { level: 'Low', color: '#059669', recommendation: 'Safe - No protection needed' };
  if (uvIndex <= 5) return { level: 'Moderate', color: '#f59e0b', recommendation: 'Wear sunscreen SPF 15+' };
  if (uvIndex <= 7) return { level: 'High', color: '#f97316', recommendation: 'Wear sunscreen SPF 30+, seek shade' };
  if (uvIndex <= 10) return { level: 'Very High', color: '#ef4444', recommendation: 'Stay indoors 10am-4pm, SPF 50+' };
  return { level: 'Extreme', color: '#7c3aed', recommendation: 'Avoid outdoor exposure, SPF 50+' };
};

// Air Quality Levels
export const getAirQualityLevel = (pm25) => {
  if (pm25 <= 12) return { level: 'Good', color: '#059669', recommendation: 'Air quality is good' };
  if (pm25 <= 35) return { level: 'Moderate', color: '#f59e0b', recommendation: 'Sensitive groups should limit outdoor activity' };
  if (pm25 <= 55) return { level: 'Unhealthy for Sensitive', color: '#f97316', recommendation: 'Children, elderly, and asthmatics should limit outdoor activity' };
  if (pm25 <= 150) return { level: 'Unhealthy', color: '#ef4444', recommendation: 'Everyone should limit outdoor activity' };
  return { level: 'Hazardous', color: '#7c3aed', recommendation: 'Stay indoors, avoid all outdoor activity' };
};

// Pollen Levels
export const getPollenLevel = (alder, grass, ragweed) => {
  const maxPollen = Math.max(alder || 0, grass || 0, ragweed || 0);
  if (maxPollen <= 10) return { level: 'Low', color: '#059669', recommendation: 'Safe for allergy sufferers' };
  if (maxPollen <= 50) return { level: 'Moderate', color: '#f59e0b', recommendation: 'Allergy sufferers may experience symptoms' };
  if (maxPollen <= 200) return { level: 'High', color: '#f97316', recommendation: 'Severe symptoms for allergy sufferers' };
  return { level: 'Very High', color: '#ef4444', recommendation: 'Avoid outdoor activity, keep windows closed' };
};

// Eclipse Dates (2024-2030)
export const getEclipseDates = () => {
  return {
    lunar: [
      { date: '2024-09-18', type: 'Partial Lunar Eclipse', visibility: 'Americas, Europe, Africa' },
      { date: '2025-03-14', type: 'Total Lunar Eclipse', visibility: 'Americas, Europe, Africa' },
      { date: '2025-09-07', type: 'Total Lunar Eclipse', visibility: 'Asia, Australia, Pacific' },
      { date: '2026-03-03', type: 'Total Lunar Eclipse', visibility: 'Americas, Europe, Africa, Asia' },
      { date: '2026-08-28', type: 'Partial Lunar Eclipse', visibility: 'Americas, Europe, Africa' },
    ],
    solar: [
      { date: '2024-10-02', type: 'Annular Solar Eclipse', visibility: 'South America, Antarctica' },
      { date: '2025-03-29', type: 'Partial Solar Eclipse', visibility: 'Europe, Africa, Asia' },
      { date: '2025-09-21', type: 'Partial Solar Eclipse', visibility: 'Australia, Antarctica' },
      { date: '2026-02-17', type: 'Annular Solar Eclipse', visibility: 'South America, Africa' },
      { date: '2026-08-12', type: 'Total Solar Eclipse', visibility: 'Europe, Asia, North America' },
    ]
  };
};

// Weather condition mapping
export const getWeatherCondition = (code) => {
  const conditions = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
    55: 'Dense drizzle', 56: 'Freezing drizzle', 57: 'Freezing drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Freezing rain', 67: 'Freezing rain', 71: 'Slight snow',
    73: 'Moderate snow', 75: 'Heavy snow', 77: 'Snow grains',
    80: 'Rain showers', 81: 'Rain showers', 82: 'Violent rain',
    85: 'Snow showers', 86: 'Snow showers', 95: 'Thunderstorm',
    96: 'Thunderstorm', 99: 'Thunderstorm'
  };
  return conditions[code] || 'Unknown';
};

// Weather emoji
export const getWeatherEmojiFromCode = (code) => {
  const emojis = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️',
    56: '🌧️', 57: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️',
    66: '🌧️', 67: '🌧️',
    71: '❄️', 73: '❄️', 75: '❄️',
    77: '❄️',
    80: '🌦️', 81: '🌧️', 82: '⛈️',
    85: '❄️', 86: '❄️',
    95: '⛈️', 96: '⛈️', 99: '⛈️'
  };
  return emojis[code] || '🌤️';
};

// Search location
export const searchLocation = async (query) => {
  try {
    if (!query || query.length < 2) return [];
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`,
      { timeout: 5000 }
    );
    return response.data?.results || [];
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return [];
  }
};

// Moon phase calculation
export const getMoonPhase = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const phase = ((year - 2000) * 12.3685 + month * 1.5 + day * 0.033863 + 1.5) % 29.53058867;
  
  const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
                   'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const index = Math.floor((phase / 29.53058867) * 8) % 8;
  return {
    phase: phases[index],
    illumination: Math.round((1 - Math.cos((phase / 29.53058867) * 2 * Math.PI)) * 50) + 50,
    emoji: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '��'][index]
  };
};

// Next eclipse
export const getNextEclipse = () => {
  const eclipses = getEclipseDates();
  const now = new Date();
  const allEclipses = [
    ...eclipses.lunar.map(e => ({ ...e, type: 'lunar' })),
    ...eclipses.solar.map(e => ({ ...e, type: 'solar' }))
  ];
  
  const future = allEclipses
    .filter(e => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return future[0] || null;
};

export default {
  getCompleteWeatherData,
  getWeatherCondition,
  getWeatherEmojiFromCode,
  getMoonPhase,
  getNextEclipse,
  getEclipseDates,
  getUVSafety,
  getAirQualityLevel,
  getPollenLevel,
  searchLocation
};
SERVICECONTENT

# ============================================================
# 3. CREATE THE MORE PAGE (WEATHER DASHBOARD)
# ============================================================
echo -e "${GREEN}Creating More page...${NC}"
mkdir -p src/pages/More
cat > src/pages/More/More.jsx << 'MORECONTENT'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCalendarAlt, FaBell, FaUser, FaCog, FaCloudSun, FaHeartbeat,
  FaPills, FaBook, FaVideo, FaChartLine, FaWeight, FaBrain,
  FaSpa, FaAppleAlt, FaMoon, FaSun, FaCloudRain,
  FaWind, FaTint, FaPlus, FaTrash, FaCheckCircle, FaArrowRight,
  FaBed, FaRunning, FaDumbbell, FaUtensils, FaGlassCheers,
  FaHeart, FaLungs, FaEye, FaBone, FaHeadphones,
  FaClock, FaCalendarCheck, FaClipboardCheck, FaFileMedical,
  FaPrescriptionBottle, FaSyringe, FaMicroscope, FaFlask,
  FaAmbulance, FaHospital, FaUserMd, FaStethoscope,
  FaNotesMedical, FaHandHoldingHeart, FaPray, FaBolt,
  FaFire, FaLeaf, FaTree, FaMountain, FaCloud,
  FaExclamationTriangle, FaShieldAlt, FaMask, FaBiohazard,
  FaThermometerHalf, FaArrowUp, FaArrowDown, FaRegSun,
  FaRegMoon, FaSync, FaGlobe, FaStar, FaSearch
} from 'react-icons/fa';
import { 
  getCompleteWeatherData, 
  searchLocation, 
  getMoonPhase, 
  getNextEclipse,
  getWeatherEmojiFromCode,
  getWeatherCondition,
  getUVSafety,
  getAirQualityLevel,
  getPollenLevel
} from '../../services/freeApiService';

const More = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('weather');
  const [weatherData, setWeatherData] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [pollenData, setPollenData] = useState(null);
  const [eclipseData, setEclipseData] = useState(null);
  const [moonData, setMoonData] = useState(null);
  const [uvSafety, setUVSafety] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [locationName, setLocationName] = useState('Coimbatore');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [viewMode, setViewMode] = useState('hourly');
  const [lastUpdated, setLastUpdated] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [dataSource, setDataSource] = useState('');
  const intervalRef = useRef(null);
  const isMounted = useRef(true);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';
  const emeraldGradient = 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)';

  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '--';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return isoString;
    }
  };

  const fetchWeather = async (location, showRefresh = false) => {
    if (!isMounted.current) return;
    
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    
    setError(null);
    setWeatherData(null);
    
    try {
      const result = await getCompleteWeatherData(location);
      
      if (result.error) {
        setError(result.error);
      } else if (result.weather) {
        setWeatherData(result.weather);
        setLocationInfo(result.location);
        setDataSource(result.source || 'Open-Meteo');
        setHourlyData(result.hourly || []);
        setDailyData(result.daily || []);
        setAirQuality(result.airQuality || null);
        setPollenData(result.pollen || null);
        
        if (result.weather.uvIndex !== undefined) {
          setUVSafety(getUVSafety(result.weather.uvIndex));
        }
        
        const moon = getMoonPhase();
        setMoonData(moon);
        
        const eclipse = getNextEclipse();
        setEclipseData(eclipse);
        
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString());
        setError(null);
      } else {
        setError('Unable to fetch weather data. Please try a different location.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error. Please check your connection.');
    } finally {
      if (isMounted.current) {
        setLoading(false);
        setRefreshing(false);
        setSearching(false);
      }
    }
  };

  const handleLocationSearch = async (e) => {
    const value = e.target.value;
    setNewLocation(value);
    setSearchResults([]);
    setShowSuggestions(false);
    
    if (value.length > 2) {
      try {
        const results = await searchLocation(value);
        const filtered = results.filter(r => 
          r.name && r.country && 
          r.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filtered);
        setShowSuggestions(filtered.length > 0);
      } catch (error) {
        setShowSuggestions(false);
      }
    }
  };

  const selectLocation = (loc) => {
    const name = loc.name || loc;
    setLocationName(name);
    setNewLocation('');
    setShowLocationInput(false);
    setShowSuggestions(false);
    fetchWeather(name);
  };

  const handleManualRefresh = () => {
    fetchWeather(locationName, true);
  };

  useEffect(() => {
    isMounted.current = true;
    fetchWeather(locationName);
    intervalRef.current = setInterval(() => {
      if (isMounted.current) {
        fetchWeather(locationName, true);
      }
    }, 180000);
    return () => {
      isMounted.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [locationName]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase());
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setSelectedFeature(tab);
  }, [location]);

  const getWeatherEmoji = (code) => getWeatherEmojiFromCode(code) || '🌤️';
  const getWeatherCondition = (code) => {
    const conditions = {
      0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
      55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain',
      65: 'Heavy rain', 71: 'Slight snow', 73: 'Moderate snow',
      75: 'Heavy snow', 80: 'Rain showers', 81: 'Rain showers',
      82: 'Violent rain', 85: 'Snow showers', 86: 'Snow showers',
      95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
    };
    return conditions[code] || 'Unknown';
  };

  const isDaytime = (sunrise, sunset) => {
    if (!sunrise || !sunset) return true;
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();
    const sunriseDate = new Date(sunrise);
    const sunsetDate = new Date(sunset);
    const sunriseMinutes = sunriseDate.getHours() * 60 + sunriseDate.getMinutes();
    const sunsetMinutes = sunsetDate.getHours() * 60 + sunsetDate.getMinutes();
    return current >= sunriseMinutes && current < sunsetMinutes;
  };

  const renderWeather = () => (
    <div>
      {/* Location Search */}
      <div style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '18px 24px',
        marginBottom: '24px',
        boxShadow: '0 4px 30px rgba(0,0,0,0.04)',
        border: '1px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '200px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: emeraldGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: 'white',
            boxShadow: '0 4px 16px rgba(5,150,105,0.25)'
          }}>📍</div>
          {!showLocationInput ? (
            <div>
              <div style={{ fontWeight: '700', color: '#1f2937', fontSize: '1.1rem' }}>
                {locationInfo?.name || locationName}
                {locationInfo?.country && (
                  <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '400', marginLeft: '6px' }}>
                    {locationInfo.country}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: weatherData ? '#10b981' : '#ef4444', animation: weatherData ? 'pulse 2s infinite' : 'none' }}></span>
                {weatherData?.condition || 'No data'}
                {dataSource && <span style={{ fontSize: '0.55rem', color: '#9ca3af' }}>({dataSource})</span>}
                {lastUpdated && <span style={{ fontSize: '0.55rem', color: '#9ca3af' }}>Updated: {lastUpdated}</span>}
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={newLocation}
                  onChange={handleLocationSearch}
                  placeholder="Search any city, country, or region..."
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    fontSize: '0.95rem',
                    outline: 'none',
                    minWidth: '180px',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = emerald; e.target.style.boxShadow = `0 0 0 4px ${emeraldLight}`; }}
                  onBlur={(e) => { 
                    setTimeout(() => setShowSuggestions(false), 200);
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newLocation.trim()) {
                      selectLocation({ name: newLocation });
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newLocation.trim()) {
                      selectLocation({ name: newLocation });
                    }
                  }}
                  disabled={searching}
                  style={{
                    padding: '10px 24px',
                    background: searching ? '#6b7280' : emeraldGradient,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: searching ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    boxShadow: '0 4px 16px rgba(5,150,105,0.25)',
                    opacity: searching ? 0.6 : 1
                  }}
                >
                  <FaGlobe style={{ marginRight: '6px' }} />
                  {searching ? 'Searching...' : 'Search'}
                </button>
                <button
                  onClick={() => {
                    setShowLocationInput(false);
                    setShowSuggestions(false);
                    setNewLocation('');
                  }}
                  style={{
                    padding: '10px 20px',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
              {showSuggestions && searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  border: '1px solid #f3f4f6',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '4px'
                }}>
                  {searchResults.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectLocation(loc)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = emeraldLight; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>📍</span>
                      <span style={{ fontWeight: '500', color: '#1f2937' }}>
                        {loc.name}, {loc.country}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: '6px', fontSize: '0.7rem', color: '#6b7280' }}>
                💡 Try: London, New York, Tokyo, or any city worldwide
              </div>
            </div>
          )}
        </div>
        {!showLocationInput && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowLocationInput(true)}
              style={{
                padding: '8px 16px',
                background: 'rgba(5,150,105,0.06)',
                border: '1px solid rgba(5,150,105,0.15)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: emerald,
                fontWeight: '500',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.borderColor = emerald; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(5,150,105,0.06)'; e.currentTarget.style.borderColor = 'rgba(5,150,105,0.15)'; }}
            >
              Change Location
            </button>
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              style={{
                padding: '8px 16px',
                background: refreshing ? '#f3f4f6' : emeraldGradient,
                color: refreshing ? '#6b7280' : 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: refreshing ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s',
                boxShadow: refreshing ? 'none' : '0 4px 16px rgba(5,150,105,0.25)'
              }}
            >
              <FaSync style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
              {refreshing ? 'Updating...' : 'Refresh'}
            </button>
          </div>
        )}
      </div>

      {loading || refreshing ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'spin 1s linear infinite' }}>⏳</div>
          <p style={{ color: '#6b7280' }}>{refreshing ? 'Updating weather data...' : 'Fetching live weather data...'}</p>
        </div>
      ) : error ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
          border: '1px solid #fca5a5'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⚠️</div>
          <h3 style={{ color: '#dc2626', fontSize: '1.2rem', marginBottom: '8px' }}>Unable to fetch weather data</h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{error}</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '12px' }}>
            {['London', 'New York', 'Tokyo', 'Mumbai', 'Sydney', 'Cape Town'].map(city => (
              <button
                key={city}
                onClick={() => selectLocation({ name: city })}
                style={{
                  padding: '6px 14px',
                  background: emeraldLight,
                  color: emerald,
                  border: '1px solid rgba(5,150,105,0.2)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = emerald; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.color = emerald; }}
              >
                {city}
              </button>
            ))}
          </div>
          <button
            onClick={handleManualRefresh}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              background: emeraldGradient,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Retry
          </button>
        </div>
      ) : weatherData ? (
        <div>
          {/* Main Weather Card */}
          <div style={{
            background: `linear-gradient(145deg, ${emerald} 0%, #059669 30%, #10b981 70%, #34d399 100%)`,
            borderRadius: '24px',
            padding: '24px 28px',
            color: 'white',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 50px rgba(5,150,105,0.25)'
          }}>
            <div style={{
              position: 'absolute',
              right: '-40px',
              top: '-40px',
              fontSize: '200px',
              opacity: 0.06,
              transform: 'rotate(15deg)'
            }}>
              {getWeatherEmoji(weatherData.weatherCode || 0)}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1, letterSpacing: '-3px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
                      {Math.round(weatherData.temperature)}°
                    </span>
                    <div style={{ fontSize: '3rem', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
                      {getWeatherEmoji(weatherData.weatherCode || 0)}
                    </div>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '500', marginTop: '2px', opacity: 0.95 }}>
                    {weatherData.condition || 'Unknown'}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>
                    Feels like {Math.round(weatherData.feelsLike)}°F
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '4px 16px',
                  minWidth: '160px'
                }}>
                  <div><div style={{ fontSize: '0.5rem', opacity: 0.6, textTransform: 'uppercase' }}>💧 Humidity</div><div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{Math.round(weatherData.humidity)}%</div></div>
                  <div><div style={{ fontSize: '0.5rem', opacity: 0.6, textTransform: 'uppercase' }}>💨 Wind</div><div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{Math.round(weatherData.windSpeed)} mph</div></div>
                  <div><div style={{ fontSize: '0.5rem', opacity: 0.6, textTransform: 'uppercase' }}>🌡️ Feels Like</div><div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{Math.round(weatherData.feelsLike)}°F</div></div>
                  <div><div style={{ fontSize: '0.5rem', opacity: 0.6, textTransform: 'uppercase' }}>☀️ UV Index</div><div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{Math.round(weatherData.uvIndex)}</div></div>
                </div>
              </div>
            </div>
          </div>

          {/* UV Safety + Air Quality + Pollen */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginBottom: '16px'
          }}>
            {/* UV Safety */}
            {uvSafety && (
              <div style={{
                padding: '12px',
                background: uvSafety.color + '15',
                borderRadius: '12px',
                border: `1px solid ${uvSafety.color}30`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem' }}>☀️</div>
                <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#1f2937' }}>
                  UV: {Math.round(weatherData.uvIndex)}
                </div>
                <div style={{ fontSize: '0.7rem', color: uvSafety.color, fontWeight: '600' }}>
                  {uvSafety.level}
                </div>
                <div style={{ fontSize: '0.6rem', color: '#6b7280' }}>
                  {uvSafety.recommendation}
                </div>
              </div>
            )}

            {/* Air Quality */}
            {airQuality && (
              <div style={{
                padding: '12px',
                background: airQuality.level?.color + '15' || '#f3f4f6',
                borderRadius: '12px',
                border: `1px solid ${airQuality.level?.color || '#d1d5db'}30`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem' }}>🌬️</div>
                <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#1f2937' }}>
                  Air Quality
                </div>
                <div style={{ fontSize: '0.7rem', color: airQuality.level?.color || '#6b7280', fontWeight: '600' }}>
                  {airQuality.level?.level || 'Good'}
                </div>
                <div style={{ fontSize: '0.6rem', color: '#6b7280' }}>
                  PM2.5: {Math.round(airQuality.pm25 || 0)} µg/m³
                </div>
              </div>
            )}

            {/* Pollen */}
            {pollenData && (
              <div style={{
                padding: '12px',
                background: pollenData.level?.color + '15' || '#f3f4f6',
                borderRadius: '12px',
                border: `1px solid ${pollenData.level?.color || '#d1d5db'}30`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem' }}>🌺</div>
                <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#1f2937' }}>
                  Pollen
                </div>
                <div style={{ fontSize: '0.7rem', color: pollenData.level?.color || '#6b7280', fontWeight: '600' }}>
                  {pollenData.level?.level || 'Low'}
                </div>
                <div style={{ fontSize: '0.6rem', color: '#6b7280' }}>
                  Grass: {Math.round(pollenData.grass || 0)}
                </div>
              </div>
            )}
          </div>

          {/* Day/Night + Moon Phase */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              background: isDaytime(weatherData.sunrise, weatherData.sunset) ? '#fef3c7' : '#1e293b',
              borderRadius: '10px',
              color: isDaytime(weatherData.sunrise, weatherData.sunset) ? '#92400e' : 'white'
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {isDaytime(weatherData.sunrise, weatherData.sunset) ? '☀️' : '🌙'}
              </span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.8rem' }}>
                  {isDaytime(weatherData.sunrise, weatherData.sunset) ? 'Daytime' : 'Nighttime'}
                </div>
                <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>
                  ☀️ {formatTime(weatherData.sunrise)} | �� {formatTime(weatherData.sunset)}
                </div>
              </div>
            </div>

            {moonData && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                background: '#f3e8ff',
                borderRadius: '10px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{moonData.emoji}</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.8rem', color: '#6d28d9' }}>
                    {moonData.phase}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#6d28d9' }}>
                    {moonData.illumination}% Illuminated
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Eclipse Alert */}
          {eclipseData && (
            <div style={{
              background: 'linear-gradient(145deg, #e0f2fe 0%, #bae6fd 100%)',
              borderRadius: '10px',
              padding: '10px 14px',
              border: '1px solid #38bdf8',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🌑</span>
              <div>
                <div style={{ fontWeight: '600', color: '#0369a1', fontSize: '0.8rem' }}>
                  {eclipseData.type === 'lunar' ? '🌕 Lunar Eclipse' : '🌞 Solar Eclipse'} - {eclipseData.date}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#0369a1' }}>
                  {eclipseData.visibility || 'Visible in your region'}
                </div>
              </div>
            </div>
          )}

          {/* View Mode Toggle */}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '16px',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '6px',
            border: '1px solid rgba(255,255,255,0.2)',
            width: 'fit-content'
          }}>
            <button
              onClick={() => setViewMode('hourly')}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'hourly' ? emeraldGradient : 'transparent',
                color: viewMode === 'hourly' ? 'white' : '#6b7280',
                cursor: 'pointer',
                fontWeight: viewMode === 'hourly' ? '600' : '400',
                transition: 'all 0.3s',
                boxShadow: viewMode === 'hourly' ? '0 4px 16px rgba(5,150,105,0.25)' : 'none',
                fontSize: '0.8rem'
              }}
            >
              <FaClock style={{ marginRight: '4px' }} /> 24-Hour
            </button>
            <button
              onClick={() => setViewMode('daily')}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'daily' ? emeraldGradient : 'transparent',
                color: viewMode === 'daily' ? 'white' : '#6b7280',
                cursor: 'pointer',
                fontWeight: viewMode === 'daily' ? '600' : '400',
                transition: 'all 0.3s',
                boxShadow: viewMode === 'daily' ? '0 4px 16px rgba(5,150,105,0.25)' : 'none',
                fontSize: '0.8rem'
              }}
            >
              <FaCalendarAlt style={{ marginRight: '4px' }} /> 7-Day
            </button>
          </div>

          {/* 24-Hour Forecast */}
          {viewMode === 'hourly' && hourlyData.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '16px 20px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.04)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>
                <FaClock style={{ color: emerald, marginRight: '6px' }} /> 24-Hour Forecast
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                gap: '6px'
              }}>
                {hourlyData.slice(0, 24).map((hour, idx) => {
                  const time = idx === 0 ? 'Now' : formatTime(hour.time);
                  const temp = Math.round(hour.temp || 0);
                  const icon = getWeatherEmoji(hour.weatherCode || 0);
                  const precip = hour.precipitation || 0;
                  const isNow = idx === 0;
                  
                  return (
                    <div key={idx} style={{
                      textAlign: 'center',
                      padding: '6px 4px',
                      background: isNow ? emeraldLight : 'transparent',
                      borderRadius: '8px',
                      border: isNow ? `2px solid ${emerald}` : 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => { if (!isNow) { e.currentTarget.style.background = '#f8fafc'; } }}
                    onMouseLeave={(e) => { if (!isNow) { e.currentTarget.style.background = 'transparent'; } }}
                    >
                      <div style={{ fontSize: '0.5rem', fontWeight: isNow ? '700' : '400', color: isNow ? emerald : '#6b7280' }}>
                        {time}
                      </div>
                      <div style={{ fontSize: '1.2rem' }}>{icon}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#1f2937' }}>
                        {temp}°
                      </div>
                      {precip > 0 && (
                        <div style={{ fontSize: '0.4rem', color: '#3b82f6' }}>
                          {precip}mm
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 7-Day Forecast */}
          {viewMode === 'daily' && dailyData.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '16px 20px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.04)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>
                <FaCalendarAlt style={{ color: emerald, marginRight: '6px' }} /> 7-Day Forecast
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {dailyData.slice(0, 7).map((day, idx) => {
                  const isToday = idx === 0;
                  const dayName = isToday ? 'Today' : formatDate(day.date);
                  const high = Math.round(day.maxTemp || 0);
                  const low = Math.round(day.minTemp || 0);
                  const icon = getWeatherEmoji(day.weatherCode || 0);
                  const condition = getWeatherCondition(day.weatherCode || 0);
                  
                  return (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      background: isToday ? emeraldLight : '#f8fafc',
                      borderRadius: '8px',
                      border: isToday ? `2px solid ${emerald}` : '1px solid #f1f5f9',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => { if (!isToday) { e.currentTarget.style.background = 'white'; } }}
                    onMouseLeave={(e) => { if (!isToday) { e.currentTarget.style.background = '#f8fafc'; } }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '65px' }}>
                        <span style={{ fontWeight: isToday ? '700' : '500', color: isToday ? emerald : '#1f2937', fontSize: '0.75rem' }}>
                          {dayName}
                        </span>
                        {isToday && (
                          <span style={{ fontSize: '0.4rem', background: emerald, color: 'white', padding: '1px 6px', borderRadius: '4px' }}>
                            Today
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '1.1rem' }}>{icon}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.75rem' }}>{high}°</span>
                        <span style={{ color: '#9ca3af', fontSize: '0.7rem' }}>{low}°</span>
                        <span style={{ fontSize: '0.55rem', color: '#6b7280', maxWidth: '60px', textAlign: 'right' }}>
                          {condition}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );

  // Dashboard, Calendar, Notifications, Tools sections
  const renderDashboard = () => (
    <div style={{
      textAlign: 'center',
      padding: '60px',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.06)'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📊</div>
      <h3 style={{ color: '#1f2937', marginBottom: '8px' }}>Dashboard</h3>
      <p style={{ color: '#6b7280' }}>Your health dashboard is being loaded...</p>
    </div>
  );

  const [notifications, setNotifications] = useState([
    { id: 1, title: '💊 Medication Reminder', message: 'Time to take your evening medication', time: '5:00 PM', read: false, category: 'Medication' },
    { id: 2, title: '🏥 Appointment Reminder', message: 'Doctor appointment tomorrow at 10:00 AM', time: '4:30 PM', read: false, category: 'Appointment' },
    { id: 3, title: '📊 Weekly Health Report', message: 'Your weekly health summary is ready', time: '12:00 PM', read: true, category: 'Report' },
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: '🩺 Doctor Appointment - Dr. Smith', date: '2026-06-23', time: '10:00 AM', location: 'Main Clinic', notes: 'Annual checkup' },
    { id: 2, title: '💊 Medication Refill - Metformin', date: '2026-06-25', time: 'All Day', location: 'Pharmacy', notes: 'Refill prescription' },
    { id: 3, title: '🧘 Yoga Class - Evening Session', date: '2026-06-26', time: '6:00 PM', location: 'Wellness Center', notes: 'Bring yoga mat' },
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', notes: '' });
  const [newNotification, setNewNotification] = useState('');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddNotification, setShowAddNotification] = useState(false);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: '', date: '', time: '', location: '', notes: '' });
      setShowAddEvent(false);
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const addNotification = () => {
    if (newNotification.trim()) {
      setNotifications([
        { id: Date.now(), title: '📌 New Reminder', message: newNotification, time: currentTime, read: false, category: 'Custom' },
        ...notifications
      ]);
      setNewNotification('');
      setShowAddNotification(false);
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const renderCalendar = () => (
    <div style={{
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '28px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
          <FaCalendarAlt style={{ color: emerald, marginRight: '8px' }} /> Your Calendar
        </h3>
        <button
          onClick={() => setShowAddEvent(!showAddEvent)}
          style={{
            padding: '10px 20px',
            background: emeraldGradient,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(5,150,105,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaPlus /> Add Event
        </button>
      </div>

      {showAddEvent && (
        <div style={{ background: emeraldLight, padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = emerald}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = emerald}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <input
              type="text"
              placeholder="Time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = emerald}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = emerald}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button onClick={addEvent} style={{ padding: '10px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>Save</button>
            <button onClick={() => setShowAddEvent(false)} style={{ padding: '10px 20px', background: '#f3f4f6', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {events.map(event => (
        <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8fafc', borderRadius: '12px', borderLeft: `4px solid ${emerald}`, marginBottom: '8px', transition: 'all 0.3s' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div>
            <div style={{ fontWeight: '600', color: '#1f2937' }}>{event.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{event.date} {event.time && `• ${event.time}`}</div>
          </div>
          <button onClick={() => deleteEvent(event.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px', borderRadius: '6px', transition: 'background 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          ><FaTrash /></button>
        </div>
      ))}
    </div>
  );

  const renderNotifications = () => (
    <div style={{
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '28px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
          <FaBell style={{ color: emerald, marginRight: '8px' }} /> Notifications
          {notifications.filter(n => !n.read).length > 0 && (
            <span style={{ marginLeft: '10px', background: '#ef4444', color: 'white', padding: '2px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700' }}>
              {notifications.filter(n => !n.read).length} new
            </span>
          )}
        </h3>
        <button
          onClick={() => setShowAddNotification(!showAddNotification)}
          style={{
            padding: '10px 20px',
            background: emeraldGradient,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(5,150,105,0.3)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaPlus /> Add
        </button>
      </div>

      {showAddNotification && (
        <div style={{ background: emeraldLight, padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Reminder message"
              value={newNotification}
              onChange={(e) => setNewNotification(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = emerald}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button onClick={addNotification} style={{ padding: '10px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>Add</button>
            <button onClick={() => setShowAddNotification(false)} style={{ padding: '10px 20px', background: '#f3f4f6', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {notifications.map(notification => (
        <div key={notification.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: notification.read ? '#f8fafc' : emeraldLight, borderRadius: '12px', borderLeft: `4px solid ${notification.read ? '#e5e7eb' : emerald}`, opacity: notification.read ? 0.7 : 1, marginBottom: '8px', transition: 'all 0.3s' }}
        onMouseEnter={(e) => { if (!notification.read) { e.currentTarget.style.background = '#d1fae5'; } }}
        onMouseLeave={(e) => { if (!notification.read) { e.currentTarget.style.background = emeraldLight; } }}
        >
          <div>
            <div style={{ fontWeight: '600', color: '#1f2937' }}>{notification.title}</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{notification.message}</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '2px' }}>
              {notification.time} • {notification.category}
              {!notification.read && <span style={{ marginLeft: '8px', background: emerald, color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '0.6rem', fontWeight: '600' }}>New</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!notification.read && <button onClick={() => markAsRead(notification.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: emerald, padding: '4px', borderRadius: '6px', transition: 'background 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#ecfdf5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            ><FaCheckCircle /></button>}
            <button onClick={() => deleteNotification(notification.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px', borderRadius: '6px', transition: 'background 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            ><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTools = () => (
    <div style={{
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '28px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
        <FaCog style={{ color: emerald, marginRight: '8px' }} /> Health Tools
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {[
          { icon: FaWeight, title: 'BMI Calculator', description: 'Compute your Body Mass Index', color: '#8b5cf6', path: '/health-tracker' },
          { icon: FaBell, title: 'Medication Reminder', description: 'Set daily reminders', color: '#f59e0b', path: '/rx-checker' },
          { icon: FaBook, title: 'Wellness Blog', description: 'Read health articles', color: '#059669', path: '/blog' },
          { icon: FaVideo, title: 'Telehealth', description: 'Connect with a doctor', color: '#3b82f6', path: '/doctors' },
          { icon: FaHeartbeat, title: 'Health Tracker', description: 'Monitor your vitals', color: '#ef4444', path: '/health-tracker' },
          { icon: FaBrain, title: 'AI Triage', description: 'Symptom checker', color: '#8b5cf6', path: '/ai-triage' },
        ].map((tool, idx) => (
          <div
            key={idx}
            onClick={() => navigate(tool.path)}
            style={{
              padding: '18px',
              borderRadius: '14px',
              background: `${tool.color}06`,
              border: '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tool.color;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
              e.currentTarget.style.background = `${tool.color}12`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = `${tool.color}06`;
            }}
          >
            <div style={{ fontSize: '1.8rem', color: tool.color, marginBottom: '8px' }}><tool.icon /></div>
            <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>{tool.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>{tool.description}</div>
            <div style={{ marginTop: '12px', color: tool.color, opacity: 0.6 }}><FaArrowRight /></div>
          </div>
        ))}
      </div>
    </div>
  );

  const getFeatureTitle = () => {
    switch(selectedFeature) {
      case 'dashboard': return 'Dashboard';
      case 'weather': return 'Live Weather';
      case 'calendar': return 'Calendar';
      case 'notifications': return 'Notifications';
      case 'tools': return 'Health Tools';
      default: return 'Dashboard';
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f7fc', paddingBottom: '40px' }}>
      
      {/* Hero Banner */}
      <div style={{
        background: emeraldGradient,
        padding: '28px 20px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          right: '-30px',
          top: '-30px',
          fontSize: '120px',
          opacity: 0.05
        }}>⚡</div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>
            {getFeatureTitle()}
          </h1>
          <p style={{ opacity: 0.9, margin: '4px 0 0 0', fontSize: '0.95rem' }}>
            {selectedFeature === 'dashboard' && 'Overview of your health and activities'}
            {selectedFeature === 'weather' && 'Real-time weather updates and forecast'}
            {selectedFeature === 'calendar' && 'Manage your schedule and events'}
            {selectedFeature === 'notifications' && 'Stay updated with alerts and reminders'}
            {selectedFeature === 'tools' && 'Explore all health tools and utilities'}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px' }}>
        {selectedFeature === 'dashboard' && renderDashboard()}
        {selectedFeature === 'weather' && renderWeather()}
        {selectedFeature === 'calendar' && renderCalendar()}
        {selectedFeature === 'notifications' && renderNotifications()}
        {selectedFeature === 'tools' && renderTools()}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default More;
MORECONTENT

# ============================================================
# 4. UPDATE APP.JSX TO INCLUDE MORE PAGE
# ============================================================
echo -e "${GREEN}Updating App.jsx...${NC}"
cat > src/App.jsx << 'APPCONTENT'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PrescriptionProvider } from './contexts/PrescriptionContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { SymptomProvider } from './contexts/SymptomContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { DrugProvider } from './contexts/DrugContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Doctors from './pages/Doctors/Doctors';
import HealthTracker from './pages/HealthTracker/HealthTracker';
import Settings from './pages/Settings/Settings';
import Blog from './pages/Blog/Blog';
import Dashboard from './pages/Dashboard/Dashboard';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import NotificationCenter from './pages/Notifications/NotificationCenter';
import PlaceholderPage from './pages/PlaceholderPage/PlaceholderPage';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import RxChecker from './pages/RxChecker/RxChecker';
import AITriage from './pages/AITriage/AITriage';
import DosageGuide from './pages/DosageGuide/DosageGuide';
import More from './pages/More/More';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import Cart from './pages/Cart/Cart';
import Favorites from './pages/Favorites/Favorites';
import Compare from './pages/Compare/Compare';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <PrescriptionProvider>
              <SettingsProvider>
                <SymptomProvider>
                  <ToastProvider>
                    <DrugProvider>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/health-tracker" element={<HealthTracker />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/notifications" element={<NotificationCenter />} />
                        <Route path="/book-appointment" element={<BookAppointment />} />
                        <Route path="/rx-checker" element={<RxChecker />} />
                        <Route path="/ai-triage" element={<AITriage />} />
                        <Route path="/dosage-guide" element={<DosageGuide />} />
                        <Route path="/more" element={<More />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/service/:id" element={<ServiceDetail />} />
                        <Route path="/placeholder" element={<PlaceholderPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/compare" element={<Compare />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <Footer />
                    </DrugProvider>
                  </ToastProvider>
                </SymptomProvider>
              </SettingsProvider>
            </PrescriptionProvider>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
APPCONTENT

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Project fix completed!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Run: npm run dev"
echo "2. Go to: http://localhost:5174/more"
echo "3. Check the weather page with all features"
echo ""
echo -e "${GREEN}Features added:${NC}"
echo "✅ 24-Hour Forecast"
echo "✅ 7-Day Forecast"
echo "✅ UV Index with Safety Levels"
echo "✅ Air Quality (PM2.5, PM10, O3, NO2, CO)"
echo "✅ Pollen Levels (Tree, Grass, Weed)"
echo "✅ Solar & Lunar Eclipse Dates"
echo "✅ Moon Phase with Illumination"
echo "✅ Day/Night Indicator"
echo "✅ Location Search with Autocomplete"
echo "✅ Live Weather Data from Open-Meteo"
echo ""
echo -e "${YELLOW}If you see any errors, run:${NC}"
echo "rm -rf node_modules .vite"
echo "npm install"
echo "npm run dev"
