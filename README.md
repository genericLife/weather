# weather
React web app that shows weather report based on geo location. Uses Jest for unit tests and webpack for bundling.

1. Clone repo
```bash
  git clone https://github.com/genericLife/weather.git
  cd Weather
```
2. Ensure correct node version
```bash
  nvm use 20.11.1
```
3. Install dependencies
```bash
  npm install
```
4. Add API key to env
```bash
  .env
```
5. Start dev server
```bash
  npm start
```
6. Run Jest unit tests
```bash
  npm test
```
7. Build for production
```bash
  npm run build
```   

Additional features/considerations: I was getting inconsistent location names due to how the OpenWeatherMap API operates, I fixed this by using OWM's reverse location lookup and displaying the city name.
