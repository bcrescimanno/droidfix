# Droidfix.js
This is a small example which provides a correction for the way the
Google Android platform handles the ended and pause events relating
to HTML5 video.

## Default (wrong) Behavior
The Android platform, when it begins playback of a new HTML5 video, 
opens a new "video viewing" window that is only partially connected
to the main browser window.  To return to the browser window, the
user must use the device's back button.

When the user performs this action, an "ended" event is fired on the
video element regardless of the position of the playback when the user
hit the back button. This is contrary to the spec which states the 
following precondition for firing the ended event:

> currentTime equals the end of the media resource

A more appropriate event to fire would be a "pause" event; however, 
the Android device doesn't do so. 

## What this example does
In this example, I'm demonstrating how you can "fake" knowing whether
the ended event is real or not by tracking the time index of the video.
We have to store this value locally as, in addition to firing an
ended event when it shouldn't, Android also resets the currentTime of
the video object to 0 when exiting the player.

If it is determined that the video was paused and not ended, a
custom pause event is generated and fired to trigger any handlers
bound to pause. If it is determined that that the video has really
ended, the list of callbacks provided will be called and sent 
the ended event.

## Usage
_Note: As it currently stands in the 0.1 state, this code provides a great example_
_of how to get around this issue; it's not meant to be deployed as is_

Two things to note about current use:

1. This really only supports a single video object as it's currently built
2. Handlers for "ended" events must be added using droidfix.addEndedListener
rather than element.addEventListener("ended").

Ultimately, these issues should be resolved in a later version.

## Caveats
There are a few issues, most notably that if the user scrubs back to
an earlier time index in the video after having past the threshold, the
video will be considered "ended" when the user pauses. 

## Coming Soon...ish
I want to convert this into two thing:

1. A jQuery plugin that leverages bind() and provides custom functionality
2. Part of a standalone library for handling issues with mobile video

But that will come in time; please feel free to fork and implement those
things yourself and I will accept pull requests with quality code. :)