const $checkBtn = $('.js-check-btn');
$checkBtn.on("click", onCheckClicked);

function onCheckClicked(){
	console.log( this );

	const $currentBtn = $( this );
	const $icon = $( this ).find('.icon');

	$currentBtn.toggleClass('active');

	$icon.removeClass('checkmark minus');

	if ( $currentBtn.hasClass('active') ) {
		$icon.addClass('checkmark')
	}
	else {
		$icon.addClass('minus')
	}
	
}

function initMap() {
	const $routeItems = $('.js-route-item');

	const $firstItem = $routeItems.first();
	const firstLat = parseFloat( $firstItem.attr('data-lat'), 10 );
	const firstLong = parseFloat( $firstItem.attr('data-lng'), 10 );
	
	const map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: firstLat, lng: firstLong},
		zoom: 10	,
		scrollwheel: false,
	});

	const marker = new google.maps.Marker({
	    map: map,
	    position: {
	    	lat: firstLat,
	    	lng: firstLong,
	    },
	    title: $firstItem.find('.header').text()
	});

	google.maps.event.addListener(marker, 'click', function() {
		$firstItem.addClass('active');
	});

	$routeItems.on('click', function( e ) {
		e.preventDefault();

		const $currentItem = $( this ); // only to be able to access jquery functions...

		const index = $currentItem.index();
		goToMarker( map, $routeItems, index );
	});

}

function goToMarker( map, routeItems, index ) {
	const $currentItem = routeItems.eq( index )
	console.log ( $currentItem )

	const currentLat = parseFloat( $currentItem.attr('data-lat'), 10 );
	const currentLong = parseFloat( $currentItem.attr('data-lng'), 10 );

	const marker = new google.maps.Marker({
	    map: map,
	    position: {
	    	lat: currentLat,
	    	lng: currentLong,
	    },
	    title: $currentItem.find('.header').text()
	});

	map.panTo({
    	lat: currentLat,
    	lng: currentLong,
    });

	google.maps.event.addListener(marker, 'click', function() {
		routeItems.removeClass('active');
		$currentItem.addClass('active');
	});
}





