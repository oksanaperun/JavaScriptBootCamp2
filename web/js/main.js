function getReductionText(text, requiredLength) {
    // If text length equals or less then required, return whole text
    if (text.length <= requiredLength)
        return text;

    var correctLastSymbols = [ // Array of symbols which indicate end of the sentence or word
            '.',
            ';',
            ',',
            ' '
        ],
        minFirstSentence = text; // Minimum possible reduction of the text

    // Finding minimum possible reduction of the text
    for (var i = 0; i < correctLastSymbols.length; i++) {
        var firstSentence = text.split(correctLastSymbols[i])[0];

        if (firstSentence.length < minFirstSentence.length)
            minFirstSentence = firstSentence;
    }

    if (minFirstSentence.length > requiredLength) // Checking existence of logical reduction of the text to the maximum required length
        return ''; // If there is no logical reduction of the text, return empty string

    for (i = 0; i < correctLastSymbols.length; i++) {
        if (text.substr(requiredLength, 1) == correctLastSymbols[i]) // Checking first symbol after required length
            return text.substr(0, requiredLength);

        // Finding matching with symbol from the end of the reduction text to the maximum required length
        for (var j = 0; j < requiredLength; j++)
            if (text.substr(requiredLength - j, 1) == correctLastSymbols[i])
                return text.substr(0, requiredLength - j);
    }

}

// function test
var text = 'Lorem ipsum dolor sit amet';
console.log(getReductionText(text, 20));