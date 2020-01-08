db.results.aggregate(
    [
        {
            $unwind : "$LENEX.MEETS.MEET"
        },
        {
            $project: 
            {
                "uuid":"$uuid",
                "meet":"$LENEX.MEETS.MEET"
            }    
        },
        {
            $unwind : "$meet.CLUBS.CLUB"
            
        },
        {
            $project: 
            {
                "uuid":"$uuid",
                "club_type":"$meet.CLUBS.CLUB.@type",
                "club_code":"$meet.CLUBS.CLUB.@code",
                "club_nation":"$meet.CLUBS.CLUB.@nation",
                "club_region":"$meet.CLUBS.CLUB.@region",
                "club_name":"$meet.CLUBS.CLUB.@name",
                "club":"$meet.CLUBS.CLUB"
            }    
        },
        {
            $unwind : "$club.ATHLETES.ATHLETE"
        },
         {
            $project: 
            {
                "uuid":"$uuid",
                "club_type":"$club_type",
                "club_code":"$club_code",
                "club_nation":"$club_nation",
                "club_region":"$club_region",
                "club_name":"$club_name",
                "athleteid":"$club.ATHLETES.ATHLETE.@athleteid",
                "athlete_birthdate":"$club.ATHLETES.ATHLETE.@birthdate",
                "athlete_firstname":"$club.ATHLETES.ATHLETE.@firstname",
                "athlete_lastname":"$club.ATHLETES.ATHLETE.@lastname",
                "athlete_nation":"$club.ATHLETES.ATHLETE.@nation",
                "athlete_licence":"$club.ATHLETES.ATHLETE.@license",
                "athlete_swrid":"$club.ATHLETES.ATHLETE.@swrid",
                "athlete":"$club.ATHLETES.ATHLETE"
            }    
        },
        {
            $unwind : "$athlete.RESULTS.RESULT"
        },
        {
         $project: 
            {
                "_id":0,
                "uuid":"$uuid",
                "club_type":"$club_type",
                "club_code":"$club_code",
                "club_nation":"$club_nation",
                "club_region":"$club_region",
                "club_name":"$club_name",
                "athleteid":"$athleteid",
                "athlete_birthdate":"$athlete_birthdate",
                "athlete_firstname":"$athlete_firstname",
                "athlete_lastname":"$athlete_lastname",
                "athlete_nation":"$athlete_nation",
                "athlete_licence":"$athlete_licence",
                "athlete_swrid":"$athlete_swrid",
                "eventid":"$athlete.RESULTS.RESULT.@eventid",
                "points":"$athlete.RESULTS.RESULT.@points",
                "resultid":"$athlete.RESULTS.RESULT.@resultid",
                "swimtime":"$athlete.RESULTS.RESULT.@swimtime",
            }
        },
        {
            $out:"result_athlete"
        }
        
])