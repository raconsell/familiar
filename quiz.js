<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>

<script
  src="https://stealingfromwizards.com/s/papaparsemin.js"></script>




<script>

const seasons = "#radio-96a3ffed-04eb-4d93-a45e-6b4f185ac03c";
const days = "#radio-a26d73bc-93e4-48b1-8277-89828eb6a49d";
const dates = "#radio-a6646f71-fecb-44ed-990b-77c8fbcdbdb6";
const ducks = "#radio-20041925-056d-4ff0-8a4d-ebea139428af";
const digits = "#radio-3b529111-b3a9-4511-8b9e-d6685eba6cfd";
const downtime = "#radio-90836a50-47a8-4879-8a55-b53081895d17";
const clashes = "#radio-59d693a1-6d6f-4d8f-a5b5-3a013d7e151c";
const lashes = "#radio-629c2e3e-704f-4a99-93ae-6aa0ec533169";
const description = "#radio-1ccee5d8-6039-4249-9d0e-abd76c30f65a";
const destruction = "#radio-6cc841db-86cf-473c-8c1c-90fac2a774e0";
const flying = "#radio-79d54756-973c-4e6d-9ce4-f25a52c220d9";
const dining = "#radio-47d3f656-f89d-4c77-aa40-b7468b2b4a6b";

const resultArea = "#block-yui_3_17_2_1_1634078832984_2999";

let mapping = Papa.parse("Animal,Winter,Spring,Summer,Autumn,Sun,Moon,Tyr,Odin,Thor,Freya,Saturn,dancing,cuisine,friends,talk,Pests,Pets,Poultry,Longer,Shorter,Same,book,beach,travel,friends,panic,negotiate,violence,ignore,long,short,lush,sparse,full,quixotic,mercurial,phlegmatic,effervescent,bacchanalian,kinetic,electromagnetics,thermodynamic,alchemical,mortar,carpet,broom,quail,pork,fish,cauliflower\nAardvark,0,3,10,6,0,10,2,4,1,3,10,0,10,3,6,10,5,0,3,6,9,6,10,3,0,10,6,0,3,6,8,2,10,4,10,2,4,6,8,0,3,6,9,3,6,9,10,6,0,6\nAfrican Buffalo,10,3,0,6,1,0,4,10,6,2,8,0,3,10,6,5,0,10,9,6,3,3,0,6,10,3,0,6,10,4,2,8,6,10,2,10,6,8,4,9,3,6,0,9,6,3,6,0,3,10");

let questionIDs = [seasons, days, dates, ducks, digits, downtime, clashes, lashes, description, destruction, flying, dining];
let questionResponses=[];

options = $(".form-inner-wrapper .option");

for (let q = 0; q < questionIDs.length; q++) {
	$(questionIDs[q]).hide();
}

$(':input[type="submit"]').prop('disabled', true);
$(':input[type="submit"]').hide();
$(resultArea).hide();

async function singleQ(current,next){
	let selection = "";
	$(current+' input').click(function(){
		selection = $(this).val(); 	
		
      	$(current).hide();
      	$(next).show();
		console.log(selection);		
		questionResponses.push(selection);		
    });	
}

async function allQs(){

	$(questionIDs[0]).show();
	for (let q = 0; q < questionIDs.length; q++) {
		await singleQ(questionIDs[q], questionIDs[q+1]).then(console.log("I waited"));
			
	}
	
}

function finalCalc(){
	$(questionIDs[questionIDs.length-1]).click(function(){
		familiar = "none"
		best = 0;
		
		for (let animal=1; animal<mapping.data.length;animal++){
			let tally = 0;
			let responsePointer = 0;
			console.log(mapping.data[animal][0]);
			for (let choice = 0; choice<options.length; choice++)
			{
				console.log(options[choice].innerText);
				console.log(questionResponses[responsePointer]);
				if (options[choice].innerText == " "+questionResponses[responsePointer])
				{
					responsePointer++;	
					tally+=parseInt(mapping.data[animal][choice+1]);
					console.log("foundone");
				}
				console.log(tally);
			 }
			if (tally > best)
			{
				best = tally;
				familiar = mapping.data[animal][0]
			}
		}
		message = "Your familiar is a";
		
      if (familiar.charAt(0)=='A' || familiar.charAt(0)=='E'||familiar.charAt(0)=='I'||familiar.charAt(0)=='O'||familiar.charAt(0)=='U')
		{
			message +="n";
		}

		message+=" " + familiar;
		$(resultArea).text(message);
		$(resultArea).show();
  });	
}


async function main(){
allQs();
finalCalc();

}
$(function(){
	if($('body').is('#collection-6154e4a4db7c27179a3c7faf')){
		main()
		}
	}
);
</script>