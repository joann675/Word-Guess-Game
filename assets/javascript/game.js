    var cars = [
      "LaCrosse", "Regal", "Cascada", "Verano", "Encore", "Envision", "Enclave",
      "Bolt", "Camaro", "Colorado", "Corvette", "Cruze", "Equinox", "Impala", "Malibu", "Silverado", "Sonic", "Spark",
      "Suburban", "Tahoe", "Traverse", "Trax", "Volt",
      "Challenger", "Charger", "Durango", "Journey",
      "Focus", "Mustang", "Fiesta", "Ranger", "Explorer", "EcoSport", "Escape", "Fusion", "Expedition", "Edge", "Taurus", "Focus",
      "Terrain", "Acadia", "Yukon", "Canyon", "Sierra",
      "Accord", "Civic", "Clarity", "Fit", "Insight", "Odyssey", "Pilot", "Ridgeline",
      "Accent", "Elantra", "Veloster", "Ioniq", "Sonata", "Kona", "SantaFe", "Tucson",
      "Compass", "Renegade", "Wrangler", "Cherokee", "Patriot",
      "Optima", "Sportage", "Soul", "Forte",
      "Nautilus", "Navigator",
      "Eclipse", "Outlander", "Lancer", "Mirage", "Montero", "Diamante", "Challenger", "Eclipse", "Endeavor", "Galant", "Lancer",
      "Altima", "Armada", "Frontier", "Kicks", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa",
      "Boxster", "Cayenne", "Panamera", "Macan", "Cayman",
      "Dawn", "Ghost", "Phantom", "Wraith",
      "Forester", "Outback", "Legacy", "Impreza", "Baja", "Crosstrek", "Ascent",
      "Avalon", "Camry", "Tacoma", "Highlander", "Corolla", "Prius", "Tundra", "Sienna", "Sequoia", "Venza", "Celica", "Supra", "Tercel", "Yaris",
      "Jetta", "Passat", "Tiguan", "Atlas", "Beetle", "Golf"];

    var carsAlreadyPicked = [];  // Keeps list of cars used since game started to avoid duplicates

    var playlist = [];
    loadJukeBox();

    var index = Math.floor((Math.random() * cars.length));
    var car = cars[index];
    var lettersUsed = [];
    var guessesRemaining = 8;
    var wins = 0;
    var losses = 0;
   

    
    var wordText = document.getElementById("word-text");

    var winText = document.getElementById("wins-text");
    var remainText = document.getElementById("remain-text");
    var letters = document.getElementById("letterList");
    var frame = document.getElementById("music");
    var close = document.getElementById("close");
    var newSong = document.getElementById("newSong");


    car = car.toLowerCase();

    carsAlreadyPicked.push(car);  // Add car to list of cars already guessed


    var wordString = "";
    for (var i = 0; i < car.length; i++) {
      wordString = wordString + "_ ";
    }
    wordText.textContent = wordString;

    document.onkeyup = function (event) {

      // Determines which key was pressed.
      var userGuess = event.key;
      userGuess = userGuess.toLowerCase();

      // Skip it if it was already used or if it's not a letter
      if (lettersUsed.includes(userGuess) || event.keyCode < 65 || event.keyCode > 90)
        console.log("Letter already guessed or not a lower case alphabetic character");
      else {

        // add userGuess to lettersUsed array
        lettersUsed[lettersUsed.length] = userGuess;
        letters.textContent = "Letters already guessed: " + lettersUsed;;
        if (car.includes(userGuess)) {

          for (var i = 0; i < car.length; i++) {
            if (car.charAt(i) == userGuess[0]) {

              var j = i * 2;
              wordString = wordString.substr(0, j) + userGuess[0] + wordString.substr(j + 1);

            }
          }

        }


        else {
          console.log("You guessed incorrectly");
          guessesRemaining--;
        }

        wordText.textContent = wordString;
        remainText.textContent = "Number of Guesses Remaining: " + guessesRemaining
        if (guessesRemaining === 0) {
          alert("SORRY YOU'RE DEAD - OOPS I MEANT YOU LOSE!! - Word was " + car);
          frame.style = "block";
          close.style="block";
          frame.src = "https://www.youtube.com/embed/K6QM0Ijxrgk?autoplay=1";
          
        }

        else if (wordString.indexOf("_") == -1) {
          wins++;
          alert("YOU WON - HOPE YOU ENJOY THE MUSIC");
          frame.style = "block";
          close.style = "block";
          newSong.style = "block";
          frame.src = playlist[Math.floor(Math.random() * playlist.length)].src + "?autoplay=1";


        }
      }
    }

    function resetGame() {

      // Pick a new word that has not been used yet this session
      do {
        index = Math.floor((Math.random() * cars.length))
        car = cars[index];
        car = car.toLowerCase();
      }
      while (carsAlreadyPicked.includes(car))
      carsAlreadyPicked.push(car);
      

      wordString = "";
      for (var i = 0; i < car.length; i++) {
        wordString = wordString + "_ ";
      }
      wordText.textContent = wordString;

      // Reset letters used and guesses remaining - display the current number of wins
      lettersUsed = [];
      letters.textContent = "Letters already guessed: " + lettersUsed;
      winText.textContent = "Wins: " + wins;

      guessesRemaining = 8;
      remainText.textContent = "Number of Guesses Remaining: " + guessesRemaining

    }

    function stop() {
      // stop all YouTube Videos;
      frame.style = "display:none";
      frame.src = ""
      close.style = "display:none";
      newSong.style = "display:none";

      resetGame();
    }

    function chgSong() {
      // Randomly pick another song to play
      frame.src = playlist[Math.floor(Math.random() * playlist.length)].src + "?autoplay=1";


    }

    function loadJukeBox() {
      // Create objects for videos and push them onto the playlist
      var track1 = {
        artist: "Gary Numan",
        song: "Cars",
        src: "https://www.youtube.com/embed/99fRdfVIOr4"
      };
      playlist.push(track1);
      var track2 = {
        artist: "The Clash",
        song: "Brand New Cadillac",
        src: "https://www.youtube.com/embed/aFnmWkr5A8s"
      }
      playlist.push(track2);
      var track3 = {
        artist: "The Cars",
        song: "Drive",
        src: "https://www.youtube.com/embed/3XSVR7MHzLE"
      }
      playlist.push(track3);
      var track4 = {
        artist: "Purple Knights",
        song: "Little Red Corvette",
        src: "https://www.youtube.com/embed/dNKSVgNUFgI"
      }
      playlist.push(track4);
      var track5 = {
        artist: "Paul McCartney",
        song: "Drive My Car",
        src: "https://www.youtube.com/embed/sjII3yywsUg"
      }
      playlist.push(track5);
      var track6 = {
        artist: "War",
        song: "Low Rider",
        src: "https://www.youtube.com/embed/WeKw6c9aTJ0"
      }
      playlist.push(track6);
      var track7 = {
        artist: "Natalie Cole",
        song: "Pink Cadillac",
        src: "https://www.youtube.com/embed/lejCFt3uq4o"
      }
      playlist.push(track7);
      var track8 = {
        artist: "Hootie and the Blowfish",
        song: "Mustang Sally",
        src: "https://www.youtube.com/embed/3gADQ1L7Hnk"
      }
      playlist.push(track8);
      var track9 = {
        artist: "Don McLean",
        song: "American Pie",
        src: "https://www.youtube.com/embed/RciM7P9K3FA"
      }
      playlist.push(track9);
    }