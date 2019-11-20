// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.


$( document ).ready(function() {
	var history = [];
	var history_check =[];
	var lock_keydown = 0;
	var n = 0;

	function make_random_country(){
	  var country_capital_pairs = pairs;
	  var num_random = Math.floor(Math.random() * country_capital_pairs.length);
	  var QId = document.getElementById("pr2__question");
	  random_dic = country_capital_pairs[num_random];
	  QId.innerHTML = random_dic["country"];
	}

	function make_table_row(){
		var answer = $('#pr2__answer').val();
		var country = random_dic["country"];
		var capital = random_dic["capital"];
		var now_radio = $("input:radio[name='radio_']:checked").val();
		
		var row = "<tr>"
		row += "<td>"+country+"</td>"
	    row += "<td>"+answer+"</td>"
	    if (capital.toUpperCase() == answer.toUpperCase()) {
	    	var row = "<tr id='correct'>"
			row += "<td>"+country+"</td>"
	    	row += "<td>"+capital+"</td>"
	    	row += "<td><i class="+"'fas fa-check'"+"></i></td>" 
	    	row += "<td><button type='button' id="+n+" class='delbtn'>Delete</button></td>"
	    	row += "</tr>"
	    	history.push(row);
	    	history_check.push("True");
	    	if (now_radio == 'Wrong_only'){
	    		$("#all").prop("checked", true)
	    		now_radio = 'All'
	    	} 
		}
		else{
			var row = "<tr id='incorrect'>"
			row += "<td>"+country+"</td>"
	    	row += "<td><del>"+answer+"</del></td>"
			row += "<td>"+capital+ "</td>"
			row += "<td><button type='button' id="+n+" class='delbtn'>Delete</button></td>"
			row += "</tr>"
			history.push(row);
	    	history_check.push("False");
	    	if (now_radio == 'Correct_only'){
	    		$("#all").prop("checked", true)
	    		now_radio = 'All'
	    	} 
		}
	    $('#mytable > tbody:first').append(row);
	    n = n + 1;
	    change_radio(now_radio);
	}


	var capitals = [];
	for(var i in pairs){
		capitals.push(pairs[i].capital);
	}

	$('#mytable').on("click", "button", function(){
		$(this).closest("tr").remove();
		delete history_check[this.id];
		delete history[this.id];
	})


	$("#pr2__answer").autocomplete({
		source: capitals,
		select: function(event, ui){
	  	$('#pr2__answer').val(ui.item.value);
	  	$('#pr2__submit').click();
	  	lock_keydown = 1;
	    return false;
		}
	})


	make_random_country();

  $('#pr2__answer').focus();
  
  $('#pr2__submit').click(function(){
  	make_table_row();
	make_random_country();
	$('#pr2__answer').val('');
  	$('#pr2__answer').focus();
  });

  $('#pr2__answer').keydown(function(key){
  	if (lock_keydown == 0){
  		if(key.keyCode == 13){
  			$('#pr2__submit').click();
  		}
  	}
  	else{
  		lock_keydown = 0;
  	}
  });

	change_radio();  

	function change_radio(r){
		if(r == 'All'){
	  		while ($('#mytable tr').length > 3){
	  			$('#mytable > tbody:last > tr:last').remove();
	  		}
	  		for (var i = 0; i<history.length; i++){
	  			$('#mytable > tbody:first').append(history[i]);
	  		}
	  	}

	  	else if(r == 'Correct_only'){
	  		while ($('#mytable tr').length > 3){
	  			$('#mytable > tbody:last > tr:last').remove();
	  		}
	  		for (var i = 0; i<history.length; i++){
	  			if (history_check[i] == 'True'){
	  				$('#mytable > tbody:first').append(history[i]);
	  			}
	  		}
	  	}

	  	else if(r == 'Wrong_only'){
	  		while ($('#mytable tr').length > 3){
	  			$('#mytable > tbody:last > tr:last').remove();
	  		}
	  		for (var i = 0; i<history.length; i++){
	  			if (history_check[i] != 'True'){
	  				$('#mytable > tbody:first').append(history[i]);
	  			}
	  		}  		
	  	}
	}

	  $("input:radio[name='radio_']").change(function(){
	  	var r = $(this).val();
	  	change_radio(r);
	  });

});





