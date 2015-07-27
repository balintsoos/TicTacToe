function $ (id) {
	return document.getElementById(id);
}

function init (){
	$('xoTable').addEventListener('click', replyToClick, false);
	$('resetbutton').addEventListener('click', resetGame, false);
	
}
window.addEventListener('load', init, false);

var table = [[0,0,0],[0,0,0],[0,0,0]];
var matchCells = [[],[],[]];
var StepCounter = 1;
var Match = false;
var Winner = 0;

function replyToClick(e)
{
	if(e.target.tagName === 'TD'){
		var clickedCell = e.target.id;
		var row = clickedCell.charAt(0);
		var column = clickedCell.charAt(1);

		if(table[row][column]===0)
		{
			if(StepCounter%2===0){
				$(clickedCell).classList.add('cross');
				table[row][column]=2;
			}
			else{
				$(clickedCell).classList.add('circle');
				table[row][column]=1;
			}
			match();
			if(Match){
				endgame();
				stop();
			}
			else{
				if(StepCounter===9){
					draw();
					stop();
				}
				else{
					headercolor();
				}
			}
			StepCounter++;
		}
	}
}

function match()
{
	var p1=0;
	var p2=0;

	for(var i=0; i<=2; i++)
	{
		for(var j=0; j<=2; j++)
		{
			if(table[i][j]==1){
				p1++;
			}
			if(table[i][j]==2){p2++;}
			if(table[i][j]==0)
			{
				p1=0;
				p2=0;
			}
		}
		if(p1==3 || p2==3){Match=true;}
		p1=0;
		p2=0;
	}
	for(var i=0; i<=2; i++)
	{
		for(var j=0; j<=2; j++)
		{
			if(table[j][i]==1){p1++;}
			if(table[j][i]==2){p2++;}
			if(table[j][i]==0)
			{
				p1=0;
				p2=0;
			}
		}
		if(p1==3 || p2==3){Match=true;}
		p1=0;
		p2=0;
	}
	if(table[0][0]!=0 && ((table[0][0]==table[1][1]) && (table[1][1]==table[2][2]))){Match=true;}
	if(table[0][2]!=0 && ((table[0][2]==table[1][1]) && (table[1][1]==table[2][0]))){Match=true;}
}

function endgame()
{
	if(StepCounter%2===0){
		$("result").style.backgroundColor = "#F44336";
		$("result").innerHTML = "Player 2 WON!";
	}
	else{
		$("result").style.backgroundColor = "#4CAF50";
		$("result").innerHTML = "Player 1 WON!";
	}
}

function draw()
{
	$("appheader").style.backgroundColor = "#696969";
	$("player").style.display = "none";
	$("result").style.backgroundColor = "#696969";
	$("result").innerHTML = "Draw";
}

function headercolor()
{
	if(StepCounter%2===0){
		$("appheader").style.backgroundColor = "#4CAF50"; /* green */
		$("player").innerHTML = "Player 1";
	}
	else{
		$("appheader").style.backgroundColor = "#F44336"; /* red */
		$("player").innerHTML = "Player 2";
	}
}

function stop()
{
	for(var i=0; i<=2; i++)
	{
		for(var j=0; j<=2; j++)
		{
			table[i][j]=3;
		}
	}
}

function resetGame () {
	location.reload();
}