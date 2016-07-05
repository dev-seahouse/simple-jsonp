# simple-jsonp
A simple jsonp library written in oop javascript
# Usage:
# Basic usage with default options:
- Does nothing but log returned data in console.
``` Javascript
 $jsonp('http://en.wikipedia.org/w/api.php?grnnamespace=0&format=json&callback=?&action=query&generator=random&callback=callback');
```
# With options
- Options can be passed in as plain object
``` Javascript
    $jsonp('http://en.wikipedia.org/w/api.php?grnnamespace=0&format=json&callback=?&action=query&generator=random&callback=callback', {
        onSuccess: function(json) {
            console.log('success!', json);
            var pageObj = json.query.pages;
            var pageId = Object.keys(pageObj)[0];
            box.innerHTML = pageObj[pageId].title;
        },
        onTimeout: function() {
            console.log('timeout!');
        },
        timeout: 5
    });
```

# Usage example
https://jsfiddle.net/79s6mvhn/
