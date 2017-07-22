jQuery(document).ready(function($) {

	//match title generation
	// date - opponent - type
	
	$('#publish').on('hover', function(e){
		if ($("#title").val() == "") {
			set_title();
		}
	});
	
	function set_title(){
		var month = new Array();
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";
		
		var date_val = $('#acf-field_54f28f849b8ed').val();
		// var date = new Date( date_val.substring(0,4), date_val.substring(3,2), date_val.substring(5,2) );
		var date_string = month[parseInt(date_val.substring(4,6))-1] + ' ' + date_val.substring(6,8) + ', ' + date_val.substring(0,4);
		var opponent = $('#select2-chosen-3').text();
		var type = $('#select2-chosen-5').text();
		// console.log(date_string, opponent, type);
		
		if ( date_val !== '' && 
			 opponent !== 'String' &&
			 type !== 'String' ) {
			$('#title').val( date_string + ' - ' + opponent + ' - ' + type );
		}
	}
	//need the inverse, to read the title and populate the custom fields dynamically...
	


	$('#title').on('blur', function(e){
		
		var full_name = $(this).val();
		full_name = full_name.split(' ');
		$("#acf-field_54f48b2b39a94").val(full_name[0]);
		$("#acf-field_54f48b3139a95").val(full_name[1]);
		
	});

	var tax_opp_ids = [
		{'id': '38', 'text': 'Algeria'}, {'id': '52', 'text': 'Antigua and Barbuda'}, {'id': '124', 'text': 'Arabia'}, {'id': '59', 'text': 'Argentina'}, {'id': '146', 'text': 'Armenia'}, {'id': '44', 'text': 'Australia'}, {'id': '43', 'text': 'Austria'}, {'id': '39', 'text': 'Azerbaijan'}, {'id': '68', 'text': 'Barbados'}, {'id': '35', 'text': 'Belgium'}, {'id': '50', 'text': 'Belize'}, {'id': '119', 'text': 'Bermuda'}, {'id': '136', 'text': 'Bolivia'}, {'id': '47', 'text': 'Bosnia-Herzegovina'}, {'id': '21', 'text': 'Brazil'}, {'id': '83', 'text': 'Cameroon'}, {'id': '23', 'text': 'Canada'}, {'id': '116', 'text': 'Cayman Islands'}, {'id': '31', 'text': 'Chile'}, {'id': '118', 'text': 'China'}, {'id': '67', 'text': 'China PR'}, {'id': '32', 'text': 'Colombia'}, {'id': '46', 'text': 'Costa Rica'}, {'id': '51', 'text': 'Cuba'}, {'id': '34', 'text': 'Czech Republic'}, {'id': '131', 'text': 'Czechoslovakia'}, {'id': '81', 'text': 'Denmark'}, {'id': '139', 'text': 'East Germany'}, {'id': '84', 'text': 'Ecuador'}, {'id': '74', 'text': 'Egypt'}, {'id': '48', 'text': 'El Salvador'}, {'id': '24', 'text': 'England'}, {'id': '127', 'text': 'Estonia'}, {'id': '128', 'text': 'Finland'}, {'id': '27', 'text': 'France'}, {'id': '26', 'text': 'Germany'}, {'id': '30', 'text': 'Ghana'}, {'id': '80', 'text': 'Grenada'}, {'id': '56', 'text': 'Guadeloupe'}, {'id': '49', 'text': 'Guatemala'}, {'id': '64', 'text': 'Haiti'}, {'id': '33', 'text': 'Honduras'}, {'id': '132', 'text': 'Hungary'}, {'id': '117', 'text': 'Iceland'}, {'id': '63', 'text': 'Iran'}, {'id': '115', 'text': 'Israel'}, {'id': '29', 'text': 'Italy'}, {'id': '129', 'text': 'Ivory Coast'}, {'id': '45', 'text': 'Jamaica'}, {'id': '78', 'text': 'Japan'}, {'id': '120', 'text': 'Kedah'}, {'id': '141', 'text': 'Kuwait'}, {'id': '76', 'text': 'Latvia'}, {'id': '148', 'text': 'Liechtenstein'}, {'id': '123', 'text': 'Luxembourg'}, {'id': '142', 'text': 'Macedonia'}, {'id': '135', 'text': 'Malaysia'}, {'id': '133', 'text': 'Malta'}, {'id': '82', 'text': 'Martinique'}, {'id': '22', 'text': 'Mexico'}, {'id': '147', 'text': 'Moldova'}, {'id': '77', 'text': 'Morocco'}, {'id': '62', 'text': 'Netherlands'}, {'id': '72', 'text': 'New Zealand'}, {'id': '37', 'text': 'Nigeria'}, {'id': '144', 'text': 'North Korea'}, {'id': '138', 'text': 'Northern Ireland'}, {'id': '79', 'text': 'Norway'}, {'id': '13', 'text': 'Panama'}, {'id': '58', 'text': 'Paraguay'}, {'id': '65', 'text': 'Peru'}, {'id': '61', 'text': 'Poland'}, {'id': '36', 'text': 'Portugal'}, {'id': '25', 'text': 'Republic of Ireland'}, {'id': '143', 'text': 'Romania'}, {'id': '53', 'text': 'Russia'}, {'id': '145', 'text': 'Saudi Arabia'}, {'id': '28', 'text': 'Scotland'}, {'id': '73', 'text': 'Slovakia'}, {'id': '55', 'text': 'Slovenia'}, {'id': '60', 'text': 'South Africa'}, {'id': '42', 'text': 'South Korea'}, {'id': '121', 'text': 'Soviet Union'}, {'id': '57', 'text': 'Spain'}, {'id': '137', 'text': 'Surinam'}, {'id': '75', 'text': 'Sweden'}, {'id': '126', 'text': 'Switzerland'}, {'id': '149', 'text': 'Thailand'}, {'id': '125', 'text': 'Tobago'}, {'id': '122', 'text': 'Trinidad'}, {'id': '130', 'text': 'Trinidad & Tobago'}, {'id': '66', 'text': 'Trinidad and Tobago'}, {'id': '69', 'text': 'Tunisia'}, {'id': '40', 'text': 'Turkey'}, {'id': '41', 'text': 'Ukraine'}, {'id': '70', 'text': 'Uruguay'}, {'id': '54', 'text': 'Venezuela'}, {'id': '71', 'text': 'Wales'}, {'id': '140', 'text': 'West Germany'}, {'id': '134', 'text': 'Yugoslavia'},
	];
	var tax_type_ids = [
		{'id': '20', 'text': 'Confederations Cup'},
		{'id': '12', 'text': 'Friendly'},
		{'id': '19', 'text': 'Gold Cup'},
		{'id': '16', 'text': 'Olympics'},
		{'id': '17', 'text': 'World Cup'},
		{'id': '18', 'text': 'World Cup Qualifier'},
		{'id': '109', 'text': 'Kirin Cup'},
		{'id': '108', 'text': 'Carlsberg Cup'},
		{'id': '107', 'text': 'Joe Robbie Cup'},
		{'id': '113', 'text': 'Olympic Qualifier'},
		{'id': '112', 'text': 'President’s Cup'},
		{'id': '111', 'text': 'Miami Cup'},
		{'id': '114', 'text': 'Mexico City Tournament'},
		{'id': '110', 'text': 'Copa América'},
	];
	var tax_result_ids = [
		{'id': '11', 'text': 'W'},
		{'id': '14', 'text': 'L'},
		{'id': '15', 'text': 'D'}
	];

	
	$('body.post-type-match #poststuff #title').on('focus', function(e){
		
		if ( $(this).val() != '' ){
			//May 30, 2012 – Brazil – Friendly
			var meta = $(this).val().split(' - ');
			
			//date
			if( $('.hasDatepicker').val() == '') {
				console.log(meta[0]);
				// 	$('.hasDatepicker').trigger('focus');
				// 	$('.hasDatepicker').val(meta[0]);
				// 	$('.hasDatepicker.active').trigger('keydown');
				// 	$('.hasDatepicker.active').trigger('blur');
				// 	$('.hasDatepicker.active').removeClass('active');
				$(".hasDatepicker").datepicker("setDate", new Date(meta[0]));
			}
			
			if ( $('#new-tag-opponent').val() == '' ){
				//opponent
				var opp_id;
				// for (var this_type in tax_type_ids){
				for(var i=0;i<tax_opp_ids.length;i++){
					this_opp = tax_opp_ids[i];
					
					// console.log(this_opp['id'], this_opp['text']);
					if (this_opp['text'] == meta[1]) {
						opp_id = this_opp['id'];
					}
				}
				console.log(opp_id, meta[1]);
				// $('#s2id_acf-field_54f2a27b9830c .select2-choice').trigger('mousedown');
				$("#acf-field_54f2a27b9830c").select2("data", {id: opp_id, text: meta[1]}); 
				// $('#new-tag-opponent').val(meta[1]);
			}
	
			//type
			if ( $('#new-tag-match-type').val() == '' ){
				var type_id;
				// console.log(meta[2]);
				// for (var this_type in tax_type_ids){
				for(var i=0;i<tax_type_ids.length;i++){
					this_type = tax_type_ids[i];
					
					// console.log(this_type['id'], this_type['text']);
					if (this_type['text'] == meta[2]) {
						type_id = this_type['id'];
					}
				}
				console.log(type_id, meta[2]);
				$("#acf-field_54f2a3cb13c7f").select2("data", {id: type_id, text: meta[2]});
				// $('#new-tag-match-type').val(meta[2]);
			}
			
			//result
			if( $('new-tag-result').val() == '' && meta[3] ){
				var result_id;
				for(var i=0;i<tax_result_ids.length;i++){
					this_result = tax_result_ids[i];
					
					// console.log(this_type['id'], this_type['text']);
					if (this_result['text'] == meta[3]) {
						result_id = this_result['id'];
					}
				}
				console.log(result_id, meta[3]);
				$("#acf-field_54f2a3a013c7e").select2("data", {id: result_id, text: meta[3]});
			}
		}
	});
	





	//on load if title not empty
	if ( $('body.post-type-match #poststuff #title').length > 0 &&
		 $('body.post-type-match #poststuff #title').val() != '' && 
		 $('body.post-type-match #poststuff #title').val().indexOf('  ') != -1 ) {
		
		//November 17, 2010  W  1-0  South Africa      
		var meta = $("#title").val().split('  ');
		//0 November 17, 2010  
		//1 W
		//2 1-0 
		//3 South Africa
		// console.log( meta[0], meta[1], meta[2], meta[3]);
		//date
		if( $('.hasDatepicker').val() == '') {
			// console.log(meta[0]);
			$(".hasDatepicker").datepicker("setDate", new Date(meta[0]));
		}
		
		//result
		if( $('#new-tag-result').val() == '' && meta[1] ){
			var result_id;
			for(var i=0; i < tax_result_ids.length; i++){
				this_result = tax_result_ids[i];
				
				// console.log(this_result['id'], this_result['text']);
				if (this_result['text'] == meta[1]) {
					result_id = this_result['id'];
				}
			}
			// console.log(result_id, meta[1]);
			$("#acf-field_54f2a3a013c7e").select2("data", {id: result_id, text: meta[1]});
		}
		
		//score
		if( $('#acf-field_54f290a4487f9').val() == '') {
			$('#acf-field_54f290a4487f9').val( meta[2] );
		}
		
		//opponent
		if ( $('#new-tag-opponent').val() == '' ){
			var opp_id;
			// for (var this_type in tax_type_ids){
			for(var i=0; i < tax_opp_ids.length; i++){
				this_opp = tax_opp_ids[i];
				
				// console.log(this_opp['id'], this_opp['text']);
				if (this_opp['text'] == meta[3]) {
					opp_id = this_opp['id'];
				}
			}
			// console.log(opp_id, meta[3]);
			// $('#s2id_acf-field_54f2a27b9830c .select2-choice').trigger('mousedown');
			$("#acf-field_54f2a27b9830c").select2("data", {id: opp_id, text: meta[3]}); 
			// $('#new-tag-opponent').val(meta[1]);
		}
		
		var notes = $('#acf-field_54f5c1e6ee5e2').val();
		if ( 	  notes.indexOf('(WCQ') > -1 ){
				meta[4] = 'World Cup Qualifier';
		}
		else if ( notes.indexOf('(WCQ') > -1 ){
				meta[4] = 'World Cup';
		}
		else if ( notes.indexOf('(GC') > -1 ){
				meta[4] = 'Gold Cup';
		}
		else if ( notes.indexOf('(G.C.') > -1 ){
				meta[4] = 'Gold Cup';
		}
		else if ( notes.indexOf('(Gold') > -1 ){
				meta[4] = 'Gold Cup';
		}
		else if ( notes.indexOf('(OLY') > -1 ){
				meta[4] = 'Olympics';
		}
		else if ( notes.indexOf('(OLQ') > -1 ){
				meta[4] = 'Olympic Qualifier';
		}
		else if ( notes.indexOf('(CC') > -1 ){
				meta[4] = 'Confederations Cup';
		}
		else if ( notes.indexOf('(Conf') > -1 ){
				meta[4] = 'Confederations Cup';
		}
		else if ( notes.indexOf('(Kirin') > -1 ){
				meta[4] = 'Kirin Cup';
		}
		else if ( notes.indexOf('(Joe') > -1 ){
				meta[4] = 'Joe Robbie Cup';
		}
		else if ( notes.indexOf('(Carlsberg') > -1 ){
				meta[4] = 'Carlsberg Cup';
		}
		else if ( notes.indexOf('(CA’') > -1 ){
				meta[4] = 'Copa América';
		}
		else if ( notes.indexOf('(MCT') > -1 ){
				meta[4] = 'Mexico City Tournament';
		}
		else {
				meta[4] = 'Friendly';
		}
		var type_id;
		// for (var this_type in tax_type_ids){
		for(var i=0; i < tax_type_ids.length; i++){
			this_type = tax_type_ids[i];
			
			// console.log(this_type['id'], this_type['text']);
			if (this_type['text'] == meta[4]) {
				type_id = this_type['id'];
			}
		}
		// console.log(type_id, meta[4]);
		$("#acf-field_54f2a3cb13c7f").select2("data", {id: type_id, text: meta[4]});
		
		
		
		$("#title").val(meta[0] + ' - ' + meta[3] + ' - ' + meta[4]);
		$("#publish").trigger('click');
	}
		
	
	
});
