db.results.aggregate(
    [
        {
            $unwind : "$LENEX.MEETS.MEET"
        },
        {
            $project: 
            {
                "uuid":"$uuid",
                "url":{$concat:["http://megatiming.pl/contest/","$uuid"]},
                "city":"$LENEX.MEETS.MEET.@city",
                "name":"$LENEX.MEETS.MEET.@name",
                "date":"$LENEX.MEETS.MEET.AGEDATE.@value"
               
            }    
        },
         {
            $out:"result_contest"
        }
        ])