$(document).ready(function(){
        let counter=1;
        function drawing(){
            const cities=["Lodz","Warszawa","Berlin","New York","Londyn"];

            const cityRand= [];
            let position=[];
            function relegate(arr,rand,source){
                let positionCity=null;
                let ind=Math.floor(Math.random()*5);
                if(arr.length===3){
                    for (let i=0; i<3;i++){
                        positionCity=arr[i];
                        let oneCity=source[positionCity];
                        rand.push(oneCity);
                        console.log(oneCity);
                    }
                    return;
                }else{

                    if(arr.indexOf(ind)===-1){
                        arr.push(ind);
                        relegate(arr,rand,source);
                    }else{
                        relegate(arr,rand,source);
                    }
                }

            return;
            }
            relegate(position,cityRand,cities);



            let city1= cityRand[0];
            let city2= cityRand[1];
            let city3= cityRand[2];
            let infPart1="select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city1+"') and u='c'"
            let infPart2="select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city2+"') and u='c'"
            let infPart3="select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city3+"') and u='c'"

            function refresh(){
                $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + infPart1 + "&format=json").done(function(data){
                console.log(data);
                    let dataLinks=data.query.results.channel.link;
                    let links=dataLinks.split('*');
                    let cityLink=links[1];
                    let icoNbr=data.query.results.channel.item.condition.code;
                    $('#temp1').html(city1 +`<br/>`+ " temperature " + data.query.results.channel.item.condition.temp + "°C");
                    $('#descr1').html( data.query.results.channel.item.condition.text);
                    $('#city1 a').attr('href',cityLink);
                    $('#city1 img').attr('src',"http://l.yimg.com/a/i/us/we/52/"+icoNbr+".gif");
                });
                $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + infPart2 + "&format=json").done(function(data){
                //  console.log(data);
                    let dataLinks=data.query.results.channel.link;
                    let links=dataLinks.split('*');
                    let cityLink=links[1];
                    let icoNbr=data.query.results.channel.item.condition.code;
                    $('#temp2').html(city2 +`<br/>`+ " temperature " + data.query.results.channel.item.condition.temp + "°C");
                    $('#descr2').html(data.query.results.channel.item.condition.text);
                    $('#city2 a').attr('href',cityLink);
                    $('#city2 img').attr('src',"http://l.yimg.com/a/i/us/we/52/"+icoNbr+".gif");
                });
                $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + infPart3 + "&format=json").done(function(data){
                //  console.log(data);
                    let dataLinks=data.query.results.channel.link;
                    let links=dataLinks.split('*');
                    let cityLink=links[1];
                    let icoNbr=data.query.results.channel.item.condition.code;
                    $('#temp3').html(city3 +`<br/>`+ " temperature " + data.query.results.channel.item.condition.temp + "°C");
                    $('#descr3').html(data.query.results.channel.item.condition.text);
                    $('#city3 a').attr('href',cityLink);
                    $('#city3 img').attr('src',"http://l.yimg.com/a/i/us/we/52/"+icoNbr+".gif");
                });

            }
            refresh();
            let refreshing=setInterval(function(){
                console.log(counter);
                refresh();
                counter++;
                if(counter===5){
                    clearInterval(refreshing);
                }
            },10000);
        }

        drawing();

        let changeLocations=setInterval(function(){
            counter=1;
            drawing();

        },60000);

});
