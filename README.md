# DS mongo replication lab

**Before master termination**

![](https://i.imgur.com/FKrpoBm.png)

rs.status()
```
{
	"set" : "rs0",
	"date" : ISODate("2019-10-31T16:55:56.073Z"),
	"myState" : 1,
	"term" : NumberLong(10),
	"syncingTo" : "",
	"syncSourceHost" : "",
	"syncSourceId" : -1,
	"heartbeatIntervalMillis" : NumberLong(2000),
	"majorityVoteCount" : 2,
	"writeMajorityCount" : 2,
	"optimes" : {
		"lastCommittedOpTime" : {
			"ts" : Timestamp(1572540946, 1),
			"t" : NumberLong(10)
		},
		"lastCommittedWallTime" : ISODate("2019-10-31T16:55:46.392Z"),
		"readConcernMajorityOpTime" : {
			"ts" : Timestamp(1572540946, 1),
			"t" : NumberLong(10)
		},
		"readConcernMajorityWallTime" : ISODate("2019-10-31T16:55:46.392Z"),
		"appliedOpTime" : {
			"ts" : Timestamp(1572540946, 1),
			"t" : NumberLong(10)
		},
		"durableOpTime" : {
			"ts" : Timestamp(1572540946, 1),
			"t" : NumberLong(10)
		},
		"lastAppliedWallTime" : ISODate("2019-10-31T16:55:46.392Z"),
		"lastDurableWallTime" : ISODate("2019-10-31T16:55:46.392Z")
	},
	"lastStableRecoveryTimestamp" : Timestamp(1572540916, 1),
	"lastStableCheckpointTimestamp" : Timestamp(1572540916, 1),
	"electionCandidateMetrics" : {
		"lastElectionReason" : "electionTimeout",
		"lastElectionDate" : ISODate("2019-10-31T16:44:35.652Z"),
		"termAtElection" : NumberLong(10),
		"lastCommittedOpTimeAtElection" : {
			"ts" : Timestamp(0, 0),
			"t" : NumberLong(-1)
		},
		"lastSeenOpTimeAtElection" : {
			"ts" : Timestamp(1572533730, 1),
			"t" : NumberLong(9)
		},
		"numVotesNeeded" : 2,
		"priorityAtElection" : 1,
		"electionTimeoutMillis" : NumberLong(10000),
		"numCatchUpOps" : NumberLong(1498562884),
		"newTermStartDate" : ISODate("2019-10-31T16:44:36.372Z"),
		"wMajorityWriteAvailabilityDate" : ISODate("2019-10-31T16:44:37.846Z")
	},
	"members" : [
		{
			"_id" : 0,
			"name" : "mongo1:27017",
			"ip" : "172.31.44.7",
			"health" : 1,
			"state" : 1,
			"stateStr" : "PRIMARY",
			"uptime" : 693,
			"optime" : {
				"ts" : Timestamp(1572540946, 1),
				"t" : NumberLong(10)
			},
			"optimeDate" : ISODate("2019-10-31T16:55:46Z"),
			"syncingTo" : "",
			"syncSourceHost" : "",
			"syncSourceId" : -1,
			"infoMessage" : "",
			"electionTime" : Timestamp(1572540275, 1),
			"electionDate" : ISODate("2019-10-31T16:44:35Z"),
			"configVersion" : 1,
			"self" : true,
			"lastHeartbeatMessage" : ""
		},
		{
			"_id" : 1,
			"name" : "mongo2:27017",
			"ip" : "172.31.32.8",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 650,
			"optime" : {
				"ts" : Timestamp(1572540946, 1),
				"t" : NumberLong(10)
			},
			"optimeDurable" : {
				"ts" : Timestamp(1572540946, 1),
				"t" : NumberLong(10)
			},
			"optimeDate" : ISODate("2019-10-31T16:55:46Z"),
			"optimeDurableDate" : ISODate("2019-10-31T16:55:46Z"),
			"lastHeartbeat" : ISODate("2019-10-31T16:55:55.824Z"),
			"lastHeartbeatRecv" : ISODate("2019-10-31T16:55:55.899Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "",
			"syncingTo" : "mongo1:27017",
			"syncSourceHost" : "mongo1:27017",
			"syncSourceId" : 0,
			"infoMessage" : "",
			"configVersion" : 1
		},
		{
			"_id" : 2,
			"name" : "mongo3:27017",
			"ip" : "172.31.32.10",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 684,
			"optime" : {
				"ts" : Timestamp(1572540946, 1),
				"t" : NumberLong(10)
			},
			"optimeDurable" : {
				"ts" : Timestamp(1572540946, 1),
				"t" : NumberLong(10)
			},
			"optimeDate" : ISODate("2019-10-31T16:55:46Z"),
			"optimeDurableDate" : ISODate("2019-10-31T16:55:46Z"),
			"lastHeartbeat" : ISODate("2019-10-31T16:55:55.823Z"),
			"lastHeartbeatRecv" : ISODate("2019-10-31T16:55:55.897Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "",
			"syncingTo" : "mongo1:27017",
			"syncSourceHost" : "mongo1:27017",
			"syncSourceId" : 0,
			"infoMessage" : "",
			"configVersion" : 1
		}
	],
	"ok" : 1,
	"$clusterTime" : {
		"clusterTime" : Timestamp(1572540946, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	},
	"operationTime" : Timestamp(1572540946, 1)
}
```


rs.config()
```
{
	"_id" : "rs0",
	"version" : 1,
	"protocolVersion" : NumberLong(1),
	"writeConcernMajorityJournalDefault" : true,
	"members" : [
		{
			"_id" : 0,
			"host" : "mongo1:27017",
			"arbiterOnly" : false,
			"buildIndexes" : true,
			"hidden" : false,
			"priority" : 1,
			"tags" : {

			},
			"slaveDelay" : NumberLong(0),
			"votes" : 1
		},
		{
			"_id" : 1,
			"host" : "mongo2:27017",
			"arbiterOnly" : false,
			"buildIndexes" : true,
			"hidden" : false,
			"priority" : 1,
			"tags" : {

			},
			"slaveDelay" : NumberLong(0),
			"votes" : 1
		},
		{
			"_id" : 2,
			"host" : "mongo3:27017",
			"arbiterOnly" : false,
			"buildIndexes" : true,
			"hidden" : false,
			"priority" : 1,
			"tags" : {

			},
			"slaveDelay" : NumberLong(0),
			"votes" : 1
		}
	],
	"settings" : {
		"chainingAllowed" : true,
		"heartbeatIntervalMillis" : 2000,
		"heartbeatTimeoutSecs" : 10,
		"electionTimeoutMillis" : 10000,
		"catchUpTimeoutMillis" : -1,
		"catchUpTakeoverDelayMillis" : 30000,
		"getLastErrorModes" : {

		},
		"getLastErrorDefaults" : {
			"w" : 1,
			"wtimeout" : 0
		},
		"replicaSetId" : ObjectId("5db9d4729bbe83955e307b11")
	}
}
```


**After master termination**

![](https://i.imgur.com/TsUlfCC.png)

rs.status()
```
{
	"set" : "rs0",
	"date" : ISODate("2019-10-31T16:58:29.123Z"),
	"myState" : 1,
	"term" : NumberLong(11),
	"syncingTo" : "",
	"syncSourceHost" : "",
	"syncSourceId" : -1,
	"heartbeatIntervalMillis" : NumberLong(2000),
	"majorityVoteCount" : 2,
	"writeMajorityCount" : 2,
	"optimes" : {
		"lastCommittedOpTime" : {
			"ts" : Timestamp(1572541099, 1),
			"t" : NumberLong(11)
		},
		"lastCommittedWallTime" : ISODate("2019-10-31T16:58:19.417Z"),
		"readConcernMajorityOpTime" : {
			"ts" : Timestamp(1572541099, 1),
			"t" : NumberLong(11)
		},
		"readConcernMajorityWallTime" : ISODate("2019-10-31T16:58:19.417Z"),
		"appliedOpTime" : {
			"ts" : Timestamp(1572541099, 1),
			"t" : NumberLong(11)
		},
		"durableOpTime" : {
			"ts" : Timestamp(1572541099, 1),
			"t" : NumberLong(11)
		},
		"lastAppliedWallTime" : ISODate("2019-10-31T16:58:19.417Z"),
		"lastDurableWallTime" : ISODate("2019-10-31T16:58:19.417Z")
	},
	"lastStableRecoveryTimestamp" : Timestamp(1572541079, 1),
	"lastStableCheckpointTimestamp" : Timestamp(1572541079, 1),
	"electionCandidateMetrics" : {
		"lastElectionReason" : "stepUpRequestSkipDryRun",
		"lastElectionDate" : ISODate("2019-10-31T16:57:07.626Z"),
		"termAtElection" : NumberLong(11),
		"lastCommittedOpTimeAtElection" : {
			"ts" : Timestamp(1572541026, 1),
			"t" : NumberLong(10)
		},
		"lastSeenOpTimeAtElection" : {
			"ts" : Timestamp(1572541026, 1),
			"t" : NumberLong(10)
		},
		"numVotesNeeded" : 2,
		"priorityAtElection" : 1,
		"electionTimeoutMillis" : NumberLong(10000),
		"priorPrimaryMemberId" : 0,
		"numCatchUpOps" : NumberLong(27017),
		"newTermStartDate" : ISODate("2019-10-31T16:57:09.414Z"),
		"wMajorityWriteAvailabilityDate" : ISODate("2019-10-31T16:57:10.526Z")
	},
	"members" : [
		{
			"_id" : 0,
			"name" : "mongo1:27017",
			"ip" : "172.31.44.7",
			"health" : 0,
			"state" : 8,
			"stateStr" : "(not reachable/healthy)",
			"uptime" : 0,
			"optime" : {
				"ts" : Timestamp(0, 0),
				"t" : NumberLong(-1)
			},
			"optimeDurable" : {
				"ts" : Timestamp(0, 0),
				"t" : NumberLong(-1)
			},
			"optimeDate" : ISODate("1970-01-01T00:00:00Z"),
			"optimeDurableDate" : ISODate("1970-01-01T00:00:00Z"),
			"lastHeartbeat" : ISODate("2019-10-31T16:58:22.769Z"),
			"lastHeartbeatRecv" : ISODate("2019-10-31T16:57:08.346Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "Error connecting to mongo1:27017 (172.31.44.7:27017) :: caused by :: No route to host",
			"syncingTo" : "",
			"syncSourceHost" : "",
			"syncSourceId" : -1,
			"infoMessage" : "",
			"configVersion" : -1
		},
		{
			"_id" : 1,
			"name" : "mongo2:27017",
			"ip" : "172.31.32.8",
			"health" : 1,
			"state" : 1,
			"stateStr" : "PRIMARY",
			"uptime" : 806,
			"optime" : {
				"ts" : Timestamp(1572541099, 1),
				"t" : NumberLong(11)
			},
			"optimeDate" : ISODate("2019-10-31T16:58:19Z"),
			"syncingTo" : "",
			"syncSourceHost" : "",
			"syncSourceId" : -1,
			"infoMessage" : "could not find member to sync from",
			"electionTime" : Timestamp(1572541027, 1),
			"electionDate" : ISODate("2019-10-31T16:57:07Z"),
			"configVersion" : 1,
			"self" : true,
			"lastHeartbeatMessage" : ""
		},
		{
			"_id" : 2,
			"name" : "mongo3:27017",
			"ip" : "172.31.32.10",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 804,
			"optime" : {
				"ts" : Timestamp(1572541099, 1),
				"t" : NumberLong(11)
			},
			"optimeDurable" : {
				"ts" : Timestamp(1572541099, 1),
				"t" : NumberLong(11)
			},
			"optimeDate" : ISODate("2019-10-31T16:58:19Z"),
			"optimeDurableDate" : ISODate("2019-10-31T16:58:19Z"),
			"lastHeartbeat" : ISODate("2019-10-31T16:58:27.659Z"),
			"lastHeartbeatRecv" : ISODate("2019-10-31T16:58:28.537Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "",
			"syncingTo" : "mongo2:27017",
			"syncSourceHost" : "mongo2:27017",
			"syncSourceId" : 1,
			"infoMessage" : "",
			"configVersion" : 1
		}
	],
	"ok" : 1,
	"$clusterTime" : {
		"clusterTime" : Timestamp(1572541099, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	},
	"operationTime" : Timestamp(1572541099, 1)
}
```

rs.config()
```
{
	"_id" : "rs0",
	"version" : 1,
	"protocolVersion" : NumberLong(1),
	"writeConcernMajorityJournalDefault" : true,
	"members" : [
		{
			"_id" : 0,
			"host" : "mongo1:27017",
			"arbiterOnly" : false,
			"buildIndexes" : true,
			"hidden" : false,
			"priority" : 1,
			"tags" : {

			},
			"slaveDelay" : NumberLong(0),
			"votes" : 1
		},
		{
			"_id" : 1,
			"host" : "mongo2:27017",
			"arbiterOnly" : false,
			"buildIndexes" : true,
			"hidden" : false,
			"priority" : 1,
			"tags" : {

			},
			"slaveDelay" : NumberLong(0),
			"votes" : 1
		},
		{
			"_id" : 2,
			"host" : "mongo3:27017",
			"arbiterOnly" : false,
			"buildIndexes" : true,
			"hidden" : false,
			"priority" : 1,
			"tags" : {

			},
			"slaveDelay" : NumberLong(0),
			"votes" : 1
		}
	],
	"settings" : {
		"chainingAllowed" : true,
		"heartbeatIntervalMillis" : 2000,
		"heartbeatTimeoutSecs" : 10,
		"electionTimeoutMillis" : 10000,
		"catchUpTimeoutMillis" : -1,
		"catchUpTakeoverDelayMillis" : 30000,
		"getLastErrorModes" : {

		},
		"getLastErrorDefaults" : {
			"w" : 1,
			"wtimeout" : 0
		},
		"replicaSetId" : ObjectId("5db9d4729bbe83955e307b11")
	}
}
```