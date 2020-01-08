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
            $unwind : "$meet.SESSIONS.SESSION"
        },
        {
            $project:
            {
                "uuid":"$uuid",
                "session":"$meet.SESSIONS.SESSION"
                
            }
            
        },
        {
            $unwind : "$session.EVENTS.EVENT"
        },
        {
            $project:
            {
                "uuid":"$uuid",
                "distance":"$session.EVENTS.EVENT.SWIMSTYLE.@distance",
                "stroke":"$session.EVENTS.EVENT.SWIMSTYLE.@stroke",
                "eventid":"$session.EVENTS.EVENT.@eventid"
                "event":"$session.EVENTS.EVENT"
            }
            
        },
        {
            $unwind: "$event.AGEGROUPS.AGEGROUP"
        },
        {
            $project:
            {
                "uuid":"$uuid",
                "distance":"$distance",
                "stroke":"$stroke",
                "eventid":"$eventid"
                "agemin":"$event.AGEGROUPS.AGEGROUP.@agemin",
                "agemax":"$event.AGEGROUPS.AGEGROUP.@agemax",
                "agegroup":"$event.AGEGROUPS.AGEGROUP"
            }
        },
        {
            $unwind: "$agegroup.RANKINGS.RANKING"
        },
        {
            $project:
            {
                 "_id":0,
                "uuid":"$uuid",
                "distance":"$distance",
                "stroke":"$stroke",
                "eventid":"$eventid",
                "agemin":"$agemin",
                "agemax":"$agemax",
                "order":"$agegroup.RANKINGS.RANKING.@order",
                "place":"$agegroup.RANKINGS.RANKING.@place",
                "resultid":"$agegroup.RANKINGS.RANKING.@resultid",
            }
        },
        {
            $out:"result_ranking"
        }
    ]
)