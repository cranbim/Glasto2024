#define messageMaxLength 32

int numberFulfilments=8;

// char messageA0[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
// {//00000000001111111111222222222233
// 	"Thank you for your purchase.", 
//   "Your custom is important to us.", 
//   "-*-",
//   "You may find that the product", 
//   "causes chafing, rashes,", 
//   "vomiting, diarrhoea and in", 
//   "extreme cases, death.", 
//   "-*-", 
//   "This is all perfectly normal", 
//   "and should this happen to you,", 
//   "the Fulfilment Centre can take", 
//   "no responsibility.", 
//   "-*-",
//   "Enjoy the rest of your day and", 
//   "please call again."
// };

// char messageA1[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
// {//00000000001111111111222222222233
// 	"Please note by using the", 
//   "Fulfilment Centre you are", 
//   "helping to raise global", 
//   "temperatures by 3% in the next",
//   "ten years leading to widespread", 
//   "flooding, famine and", 
//   "destruction.", 
//   "-*-", 
//   "Have a good day! Your custom is", 
//   "important to us, please call", 
//   "again."
// };

// char messageA2[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
// {
// 	"This product was created with", 
//   "your wellness in mind by ten", 
//   "year olds in bonded labour", 
//   "factories. Apply liberally to", 
//   "attain eternal youth.", 
//   "-*-", 
//   "Tomorrow you will meet a tall", 
//   "dark handsome stranger. They", 
//   "will turn out to be a serial", 
//   "killer. Do not approach under", 
//   "any circumstances.", 
//   "-*-", 
//   "Have a good day! Your custom is", 
//   "important to us, please call", 
//   "again."
// };

//New messages

char messageA0[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"Do you need all this shit?",
"Wellness can come from within.",
"Maybe concentrate on what makes",
"you happy and save your cash?",
"-*-",
"Thank you for your custom,",
"please call again."
};

char messageA1[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"Is there one thing you can do",
"to make yourself feel good",
"that doesn't come with a",
"price tag?",
"-*-",
"Maybe do that?",
"Or not up to you.",
"-*-",
"Thank you for your custom,",
"please call again."
};

char messageA2[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"The global wellness industry is",
"based on profit and is worth",
"around $5.6 billion US",
"-*-",
"You don't need it.",
"-*-",
"Thank you for your custom,",
"please call again."
};

char messageA3[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"Do you really need an expensive",
"bottle of goop? Will it really",
"make you",
"younger/hotter/happier? Maybe",
"just try living your life as it",
"is now and get an early night",
"once in a while.",
"-*-",
"Thank you for your custom,",
"please call again.",
};

char messageA4[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"How are you feeling? List five",
"things you enjoy and try, it",
"could be meeting friends,",
"walking in the park or watching",
"a film, and try to do at least",
"one a week. Or just go out and",
"get smashed - your choice.",
"-*-",
"Thank you for your custom,",
"please call again.",
};

char messageA5[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"Harvesting of ingredient used",
"in cosmetics and wellness",
"products like frankincense,",
"shea, Brazil nut, juniper,",
"licorice, baobab, argan,",
"candelilla, pygeum, jatamansi,",
"gum arabic, and goldenseal is",
"causing habitat destruction and",
"worker exploitation. Maybe put",
"that bottle back on the shelf",
"and find a sustainable and",
"ethical option, or just do",
"something that makes you happy.",
"-*-",
"You are important but so is the",
"environment.",
"-*-",
"Thank you for your custom,",
"please call again.",
};

char messageA6[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"Do you really need that bottle",
"of goop? Will it bring you joy",
"or is it just there to make",
"some wealthy entrepreneur guru",
"even richer? Maybe think about",
"what will make you happier as",
"a person and try that instead?",
"-*-",
"Thank you for your custom,",
"please call again.",
};

char messageA7[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"How is the cost of living",
"crisis affecting you? It is",
"tempting to reach for a",
"product that offers happiness",
"and eternal youth in a bottle",
"as a way to avoid facing other",
"issues in your life. Maybe",
"have a cuppa and a chat with",
"friends or family instead?",
"Feeling part of a community",
"and working through problems",
"together can lead to a more",
"fulfilling life.",
"-*-",
"Thank you for your custom,",
"please call again.",
};

char messageA8[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"Will a load more shit really",
"make you happy? Is your house",
"and your bathroom cluttered",
"enough already? You don't",
"need Stacey to sort your life",
"out.",
"Buy less, live more and have",
"a good clear out once in a",
"while!",
"-*-",
"Thank you for your custom,",
"please call again.",
};

char messageA9[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
"How many half empty bottles of",
"goop do you have already? Do",
"you really need one more? Will",
"it make you happier or just",
"poorer? Is there anything you",
"can do instead that will give",
"you that dopamine hit without",
"harming your bank account and",
"contributing to plastic waste",
"and over exploitation of the",
"earth's resources?",
"-*-",
"Thank you for your custom,",
"please call again.",
};

