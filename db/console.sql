/*
 メモ
    postgresの場合、大文字を含む場合は"、文字列は'で囲む
 */

-- チーム１の参加者
select
    "teamName",
    "pairName",
    name
from
    "Team"
        inner join
    "Pair" P
    on  "Team"."teamId" = P."teamId"
        inner join
    "Participant" P2
    on  P."pairId" = P2."pairId"
where
        "teamName" = '1'
;

-- チーム別参加者数
select
    "teamName",
    count(name)
from
    "Team"
        inner join
    "Pair" P
    on  "Team"."teamId" = P."teamId"
        inner join
    "Participant" P2
    on  P."pairId" = P2."pairId"
group by
    "teamName"
order by
    "teamName"
;

-- 参加者が要件を満たないチーム(2名以下)
select
    "teamName",
    count(name)
from
    "Team"
        inner join
    "Pair" P
    on  "Team"."teamId" = P."teamId"
        inner join
    "Participant" P2
    on  P."pairId" = P2."pairId"
group by
    "teamName"
having count(name) < (select "lowerLimit" from "ParticipantLowerLimitInTeam")
order by
    "teamName"
;

-- 参加者が要件に満たないのペア
select "pairId",count("pairId") from "Participant" where "pairId" is not null group by "pairId" having count("pairId") < (select "lowerLimit" from "ParticipantLowerLimitInPair");

-- 参加者が要件を超えるペア
select "pairId",count("pairId") from "Participant" where "pairId" is not null group by "pairId" having count("pairId") > (select "upperLimit" from "ParticipantUpperLimitInPair");


-- 参加者の在籍ステータスが「休会中」か「退会済み」の場合どのチーム、ペアにも所属してはいけない
--  -> ペアに属せなければチームに属せないので、ペアに所属していないことをみる
select
    "pairId",
    name,
    "enrolledStatus"
from
    "Participant"
        inner join
    "EnrolledParticipant" EP
    on  "Participant"."participantId" = EP."participantId"
where
        "enrolledStatus" in('休会中', '退会済')
  and "pairId" is not null ;






-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- 参加者の一覧取得、新規追加、更新（少なくとも在籍ステータスを変更できること）、削除
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- 一覧
select
    "teamName",
    "pairName",
    name
from
    "Team"
        inner join
    "Pair" P
    on  "Team"."teamId" = P."teamId"
        inner join
    "Participant" P2
    on  P."pairId" = P2."pairId"
;

-- 新規追加
    -- どのペアに追加するか決める
select "pairId" from "Pair" limit 1; -- 9362ea28-02f9-46df-85e6-be1c400c6035
insert into "Participant" ("participantId", name, "mailAddress", "createdAt", "updatedAt", "pairId")
VALUES ('uuidをアプリ側で挿入','新規 追加','sample@sample.com',now(),now(),'9362ea28-02f9-46df-85e6-be1c400c6035');
