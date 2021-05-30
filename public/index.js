function insertNewTwit(twitText, twitAuthor) {
    var templateContext = {
        text: twitText,
        author: twitAuthor,
    }

    var twitHtml = Handlebars.templates.twitTemplate(templateContext)
    var twitContainer = document.querySelector(".twit-container")
    twitContainer.insertAdjacentHTML("beforeend", twitHtml)
}

var allTwits = []

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so, inserts a new twit into the page using these inputs.
 * If the user did not supply a required input, they instead recieve an alert,
 * and no new twit is inserted.
 */
function handleModalAcceptClick() {
    var twitText = document.getElementById("twit-text-input").value
    var twitAuthor = document.getElementById("twit-author-input").value

    /*
     * Only generate the new twit if the user supplied values for both the twit
     * text and the twit author.  Give them an alert if they didn't.
     */
    if (twitText && twitAuthor) {
        var twitData = {
            text: twitText,
            author: twitAuthor,
        }
        allTwits.push(twitData)

        var request = new XMLHttpRequest()
        var requestURL = "create"
        request.open("POST", requestURL)
        var requestBody = JSON.stringify(twitData)
        request.setRequestHeader("Content-Type", "application/json")
        request.send(requestBody)

        clearSearchAndReinsertTwits()
        hideCreateTwitModal()
    } else {
        alert("You must specify both the text and the author of the twit!")
    }
}

/*
 * This function clears the current search term, causing all twits to be
 * re-inserted into the DOM.
 */
function clearSearchAndReinsertTwits() {
    document.getElementById("navbar-search-input").value = ""
    doSearchUpdate()
}

/*
 * This function shows the modal to create a twit when the "create twit"
 * button is clicked.
 */
function showCreateTwitModal() {
    var modalBackdrop = document.getElementById("modal-backdrop")
    var createTwitModal = document.getElementById("create-twit-modal")

    // Show the modal and its backdrop.
    modalBackdrop.classList.remove("hidden")
    createTwitModal.classList.remove("hidden")
}

/*
 * This function clears any value present in any of the twit input elements.
 */
function clearTwitInputValues() {
    var twitInputElems = document.getElementsByClassName("twit-input-element")
    for (var i = 0; i < twitInputElems.length; i++) {
        var input = twitInputElems[i].querySelector("input, textarea")
        input.value = ""
    }
}

/*
 * This function hides the modal to create a twit and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function hideCreateTwitModal() {
    var modalBackdrop = document.getElementById("modal-backdrop")
    var createTwitModal = document.getElementById("create-twit-modal")

    // Hide the modal and its backdrop.
    modalBackdrop.classList.add("hidden")
    createTwitModal.classList.add("hidden")

    clearTwitInputValues()
}

/*
 * A function that determines whether a given twit matches a search query.
 * Returns true if the twit matches the query and false otherwise.
 */
function twitMatchesSearchQuery(twit, searchQuery) {
    /*
     * An empty query matches all twits.
     */
    if (!searchQuery) {
        return true
    }

    /*
     * The search query matches the twit if either the twit's text or the twit's
     * author contains the search query.
     */
    searchQuery = searchQuery.trim().toLowerCase()
    return (
        (twit.author + " " + twit.text).toLowerCase().indexOf(searchQuery) >= 0
    )
}

/*
 * Perform a search over over all the twits based on the search query the user
 * entered in the navbar.  Only display twits that match the search query.
 * Display all twits if the search query is empty.
 */
function doSearchUpdate() {
    /*
     * Grab the search query from the navbar search box.
     */
    var searchQuery = document.getElementById("navbar-search-input").value

    /*
     * Remove all twits from the DOM temporarily.
     */
    var twitContainer = document.querySelector(".twit-container")
    if (twitContainer) {
        while (twitContainer.lastChild) {
            twitContainer.removeChild(twitContainer.lastChild)
        }
    }

    /*
     * Loop through the collection of all twits and add twits back into the DOM
     * if they match the current search query.
     */
    allTwits.forEach(function (twit) {
        if (twitMatchesSearchQuery(twit, searchQuery)) {
            insertNewTwit(twit.text, twit.author)
        }
    })
}

/*
 * This function parses an existing DOM element representing a single twit
 * into an object representing that twit and returns that object.  The object
 * is structured like this:
 *
 * {
 *   text: "...",
 *   author: "..."
 * }
 */
function parseTwitElem(twitElem) {
    var twit = {}

    var twitTextElem = twitElem.querySelector(".twit-text")
    twit.text = twitTextElem.textContent.trim()

    var twitAuthorLinkElem = twitElem.querySelector(".twit-author a")
    twit.author = twitAuthorLinkElem.textContent.trim()

    return twit
}

/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener("DOMContentLoaded", function () {
    // Remember all of the existing twits in an array that we can use for search.
    var twitElemsCollection = document.getElementsByClassName("twit")
    for (var i = 0; i < twitElemsCollection.length; i++) {
        allTwits.push(parseTwitElem(twitElemsCollection[i]))
    }

    var createTwitButton = document.getElementById("create-twit-button")
    if (createTwitButton) {
        createTwitButton.addEventListener("click", showCreateTwitModal)
    }

    var modalCloseButton = document.querySelector(
        "#create-twit-modal .modal-close-button"
    )
    if (modalCloseButton) {
        modalCloseButton.addEventListener("click", hideCreateTwitModal)
    }

    var modalCancalButton = document.querySelector(
        "#create-twit-modal .modal-cancel-button"
    )
    if (modalCancalButton) {
        modalCancalButton.addEventListener("click", hideCreateTwitModal)
    }

    var modalAcceptButton = document.querySelector(
        "#create-twit-modal .modal-accept-button"
    )
    if (modalAcceptButton) {
        modalAcceptButton.addEventListener("click", handleModalAcceptClick)
    }

    var searchButton = document.getElementById("navbar-search-button")
    if (searchButton) {
        searchButton.addEventListener("click", doSearchUpdate)
    }

    var searchInput = document.getElementById("navbar-search-input")
    if (searchInput) {
        searchInput.addEventListener("input", doSearchUpdate)
    }
})
