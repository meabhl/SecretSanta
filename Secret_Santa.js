//******************************************************************************
// Author: Meabh Landers
// Version: 1.0
// Date: 2018-05-2018-05-2
//******************************************************************************

//This will retrieve the contents of users.JSON and create the pairs
function fn_GeneratePairs(){
			var strJSON_Data				= "";
			var strJSON_Object				= "";
			var aryNames					= [];
			var aryMatched_Names			= [];
			var aryEmails					= [];
			var strReturn_String			= "";
			var intRandom_Index				= 0;
			var intLimit					= 10;
			var strTemp_Name				= "";
			var strEmail_Link				= "";
			
			//JQuery method is used to retrieve JSON file
			var objJSON_Users = $.getJSON( "users.json", function(result) {
			  //There is one array called users in file, this will take the elementFromPoint
			  //and convert it to a string so it can be parsed
			  $.each(result, function(i, users){
				strJSON_Data = JSON.stringify(users);
				strJSON_Object = JSON.parse(strJSON_Data);
				
				//Loop through all nine users and add their names and emails to arrays
				//There are two arrays for the names, one is the master list and the 
				//other is used for the corresponding match
				for(var i = 0; i < strJSON_Object.length; i++){
					aryNames.push(strJSON_Object[i].name.first + " " + strJSON_Object[i].name.last);
					aryMatched_Names.push(strJSON_Object[i].name.first + " " + strJSON_Object[i].name.last);
					aryEmails.push(strJSON_Object[i].email);
				}
				
				//use a var to hold the HTML for the resulting table
				strReturn_String			+= "<table>";
				
				//Loop through each name
				for(var x = 0; x < aryNames.length; x++){
					//the var intLimit is equal to the length of the names array
					//intRandom_Index will be a single whole number no great then 
					//the remaining users to be matched
					intRandom_Index				= Math.floor(Math.random() * intLimit);
					strTemp_Name				= aryMatched_Names[intRandom_Index];
					
					//if a user is matched with themself, this will pick another user from the list
					//a while loop is used to cover the rare circumstance that a user gets themself twice or more
					//before receiving a valid match
					while(strTemp_Name == aryNames[x]){
						intRandom_Index			= Math.floor(Math.random() * intLimit);
						strTemp_Name			= aryMatched_Names[intRandom_Index];
					}
					
					//construct an email to send to the user
					strEmail_Link				= "mailto:" + aryEmails[x] + "?Subject=Your Secret Santa Match!&Body=Dear " + aryNames[x] + ", Your secret santa match is: " + aryMatched_Names[intRandom_Index];
					
					//build the table of matches
					strReturn_String			+= "	<tr>";
					strReturn_String			+= "		<td>" + aryNames[x] + "</td>";
					strReturn_String			+= "		<td>" + aryMatched_Names[intRandom_Index] + "</td>";
					strReturn_String			+= "		<td><a href='" + strEmail_Link + "' target='_top'><input type='button' class='button_main' value='Send email'></a></td>";
					strReturn_String			+= "	</tr>";
					
					//Clean Up: After printing each match, we remove the match from an array of users and re decrease
					//the var intLimit by one, the next time the code tries to pick a random user, it will ignore what's
					//already been picked and take into account the new array size.
					intLimit					-= 1;
					aryMatched_Names.splice(intRandom_Index, 1);
				}
				strReturn_String			+= "<table>";
				document.getElementById('demo').innerHTML = strReturn_String;
			  });
			});
		}