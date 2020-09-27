

//Second test
var carousel = document.querySelector('.carousel');
var cellCount = 9;
var selectedIndex = 0;

function setColors()
{
	//var cells = document.getElementsByClassName('carousel__cell');
	
	var color = 0;
	//for(let cell = 0; cell < cells.length; cell++)
	//{
	//	cells[cell].style.background = 'hsla('+color+', 100%, 50%, 1)';
	//	//console.log(cells[cell]);
	//	cells[cell].style.transform = 'rotateX('+color+'deg) translateZ(200px)';
	//	//console.log('rotateX('+color+'deg) translateZ(200px)')
    //    color += 360/(cells.length);
	//}

	var cellbatchs = document.getElementsByClassName('carousel');
	console.log(cellbatchs)
	for(let cellbatch = 0; cellbatch < cellbatchs.length; cellbatch++)
	{
		var cells = cellbatchs[cellbatch].getElementsByClassName('carousel__cell');
		color = 0;
		for(let cell = 0; cell < cells.length; cell++)
		{
			cells[cell].style.background = 'hsla('+color+', 100%, 50%, 1)';
			//console.log(cells[cell]);
			cells[cell].style.transform = 'rotateX('+color+'deg) translateZ(200px)';
			//console.log('rotateX('+color+'deg) translateZ(200px)')
    	    color += 360/(cells.length);
		}
	}
}

setColors();

function rotateCarousel(speed) {
  var angle = selectedIndex / cellCount * 360;
  
//   carousel.style.transition = 'transform ' + speed + 's';
//   carousel.style.transform = 'translateZ(200px) rotateX(' + angle + 'deg)';

  //EXTRA CODE THAT CAN BE REMOVED
	var cbatch = document.getElementsByClassName('carousel');
	for(let carouselitem = 0; carouselitem < cbatch.length; carouselitem++)
	{
		cbatch[carouselitem].style.transition = 'transform ' + speed + 's';
		cbatch[carouselitem].style.transitionDelay = carouselitem/3 + 's';
		cbatch[carouselitem].style.transform = 'translateZ(-200px) rotateX(' + angle + 'deg)';
	}
  //=============================
}