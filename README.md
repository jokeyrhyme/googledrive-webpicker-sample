# googledrive-webpicker-sample

attempts at presenting web users with a Google Drive document picker

https://googledrive-webpicker-sample.surge.sh/


## What is this?

Some of my other projects would benefit by having cloud-synchronised storage,
and I remembered Android has
[DocumentsProvider](http://developer.android.com/reference/android/provider/DocumentsProvider.html)
and
[DocumentsContract](http://developer.android.com/reference/android/provider/DocumentsContract.html).

With this project,
I aim to get rudimentary storage backed by Google Drive,
in a Google Drive document of the user's choosing.
Once I have this figured out,
I may extract some of the common interfaces out into something like Android,
investigating other storage providers (e.g. AWS S3, Dropbox, Box, etc).

I'd also like to keep presentation separate from underlying behaviour.


## Todo

- [ ] Google sign-in
- [ ] Google Drive list existing documents
- [ ] Google Drive create new document
- [ ] Google Drive read existing document
- [ ] Google Drive update existing document
- [ ] Google Drive delete existing document
