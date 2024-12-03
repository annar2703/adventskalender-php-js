<?php
// DEFAULT ANSWER
$answer = array(
    "code" => 404,
    "doors" => [],
    "error" => "undefined error"
);

// REQUEST for ALL books: /api/books.php
if (!isset($_GET["id"])) {
    $answer["error"] = "Specify an id. (Used as day in December)";
}

// REQUEST for SINGLE book: /api/books.php?id={id}
else if (isset($_GET["id"]) && filter_var($_GET["id"], FILTER_VALIDATE_INT) !== false && $_GET["id"] > 0 && $_GET["id"] < 25) {
    $id = $_GET["id"];

    $today = new DateTime();

    $targetDate = new DateTime('2024-12-' . $id);

    if ($today >= $targetDate) {
        $data = file_get_contents("../data/doors.json");
        $library = json_decode($data);

        if ($id <= count($library->doors)) {
            $answer["code"] = 200;
            array_push($answer["doors"], $library->doors[$id - 1]);
        }
    } else {
        $answer["error"] = "Make another try tomorrow! ;)!";
    }
}
header("Content-type:application/json");
// SEND JSON
echo json_encode($answer);
