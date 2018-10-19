// Qusai Amer
$(document).ready(function() {
	// Create a function that creates the start button and initial screen
	
	function initialScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start the game</a></p>";
		$(".mainArea").html(startScreen);
	}
	
	initialScreen();
	
	//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
	
	$("body").on("click", ".start-button", function(event){
		event.preventDefault();
		generateHTML();
	
		timerWrapper();
	
	}); // Closes start-button click
	
	$("body").on("click", ".answer", function(event){
		//answeredQuestion = true;
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]) {
			//alert("correct");
	
			clearInterval(theClock);
			generateWin();
		}
		else {
			//alert("wrong answer!");
			clearInterval(theClock);
			generateLoss();
		}
	}); // Close .answer click
	
	$("body").on("click", ".reset-button", function(event){
		resetGame();
	}); // Closes reset-button click
	
	});  //  Closes jQuery wrapper
	function generateLossDueToTimeOut() {
		unansweredTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 3000);  //  change to 3000 or other amount
	}
	
	function generateWin() {
		correctTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 3000);  //  change to 3000 or other amount
	}
	
	function generateLoss() {
		incorrectTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 3000); //  change to 3000 or other amount
	}
	
	function generateHTML() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
		$(".mainArea").html(gameHTML);
	}
	
	function wait() {
		if (questionCounter < 3) {
		questionCounter++;
		generateHTML();
		counter = 10;
		timerWrapper();
		}
		else {
			finalScreen();
		}
	}
	
	function timerWrapper() {
		theClock = setInterval(tenSeconds, 1000);
		function tenSeconds() {
			if (counter === 0) {
				clearInterval(theClock);
				generateLossDueToTimeOut();
			}
			if (counter > 0) {
				counter--;
			}
			$(".timer").html(counter);
		}
	}
	
	function finalScreen() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
		$(".mainArea").html(gameHTML);
	}
	
	function resetGame() {
		questionCounter = 0;
		correctTally = 0;
		incorrectTally = 0;
		unansweredTally = 0;
		counter = 10;
		generateHTML();
		timerWrapper();
	}
	
	var startScreen;
	var gameHTML;
	var counter = 10;
	var questionArray = ["What is the capital of Japan?", "What is the capital of China?", "What is the capital of Turkey?", "What is the capital of India?"];
	var answerArray = [["Kyoto","Hiroshima","Tokyo","Osaka"], ["Hong Kong", "Macau", "Shanghai", "Beijing"], ["Ankara","Istanbul","Antalya","Bursa"], ["Mumbai","Hyderabad","Bangalore","New Delhi"]];
	var imageArray = ["<img class='center-block img-right' src='assets/images/japan.png'>", "<img class='center-block img-right' src='assets/images/china.png'>", "<img class='center-block img-right' src='assets/images/turkey.png'>", "<img class='center-block img-right' src='assets/images/india.png'>"];
	var correctAnswers = ["C. Tokyo", "D. Beijing", "A. Ankara", "D. New Delhi"];
	var questionCounter = 0;
	var selecterAnswer;
	var theClock;
	var correctTally = 0;
	var incorrectTally = 0;
	var unansweredTally = 0;