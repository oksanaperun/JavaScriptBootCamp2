function getReductionText(text, requiredLength) {
    if (text.length <= requiredLength) // If text length equals or less then required, return whole text
        return text;

    var firstSentence = text.split(' ')[0]; // Finding sentence before first space

    if (firstSentence.length > requiredLength) // Checking existence of logical reduction of the text to the maximum required length
        return ''; // If there is no logical reduction of the text, return empty string

    text = text.substr(0, requiredLength + 1);

    // Finding a position of a last space in the text with required length
    for (var j = text.length; j > 0; j--)
        if (text.substr(j, 1) == ' ')
            return text.substr(0, j);
}

// function test
var text = 'Lorem ipsum dolor sit amet';
console.log(getReductionText(text, 20));
