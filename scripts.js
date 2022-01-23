document.addEventListener ( 'keypress', ( e ) => {
	const range = document.querySelector ( '.range__input' );
	let value = +range.value;
	let speed;

	if ( e.code === 'Period' && e.shiftKey ) {
		if ( value < 100 ) {
			value += 10;
		}
	}

	if ( e.code === 'Comma' && e.shiftKey ) {
		value += -10;
	}

	speed = getSpeed ( value );
	range.value = value;
	updateAll ( value, speed );
} );

// инициализация ползунка
function rangeInit () {
	const rangeWrap = document.querySelectorAll ( '.range-wrap' );

	if ( rangeWrap.length === 0 ) {
		return false;
	}

	rangeWrap.forEach ( wrap => {
		rangeHandler ( wrap );
	} )
}

// события ползунка
function rangeHandler ( wrap ) {
	const range = wrap.querySelector ( '.range__input' );

	if ( !range ) {
		return false;
	}

	range.addEventListener ( 'input', () => {
		const value = range.value;
		const speed = getSpeed ( value );

		updateAll (value, speed, wrap );
	} );
}

// получить скорость
function getSpeed ( value ) {
	return (value * 0.25) / 10;
}

// обновить все значения
function updateAll ( value, speed, wrap = null ) {
	updateFill ( value, wrap );
	updateSpeedVideo ( speed );
	updateSpeedNotice ( speed );
}

// обновить заполнитель
function updateFill ( value, wrap = null ) {
	let fill;

	if ( !wrap ) {
		fill = document.querySelector ( '.range__fill' );
	} else {
		fill = wrap.querySelector ( '.range__fill' );
	}

	fill.style.width = `${ value }%`;
}

// обновление скорости видео
function updateSpeedVideo ( speed ) {
	const video = document.querySelector ( '.app__video' );
	if ( speed ) {
		video.playbackRate = speed;
	}
}

// обновления значения в заметке скорости на фронте
function updateSpeedNotice ( speed ) {
	const speedData = document.querySelector ( '.app__video-notice' );

	if ( speed ) {
		speedData.innerHTML = `Speed: x${ speed }`;
	}
}

rangeInit ();


