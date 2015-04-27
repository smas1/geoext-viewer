# Introduction #

Thinking of contributing to Heron MC? Great! Below some basics
about the various ways to contribute.

## Join us ##

Our main communication channel is the mailing list/forum:
https://groups.google.com/forum/#!forum/geoext-viewer-devel

Also all comments on issues are forwarded there. At this point
the mailing list is for both users and developers, also since we
think there is a thin line between both: a typical Heron User may
start out as an Heron App developer using just configuration, but
as experience grows may grow into a Heron core-component developer.

## Reporting Issues ##

We'd love to hear suggestions for improvement, new features and/or specific problems or
concerns you have.

We use the issue list extensively for enhancements, bugs and even patches:
https://code.google.com/p/geoext-viewer/issues/list
Here's a quick list of things to consider:

Please search for your issue before filing it, many bugs and improvements may already have been reported. There's even advanced search:
https://code.google.com/p/geoext-viewer/issues/advsearch

To report a bug:

  * Write specifically what browser (type and version, like Firefox 22), OS, and browser extensions you have installed
  * Write steps to replicate the error: when did it happen? What did you expect to happen? What happened instead?
  * Please keep bug reports professional and straightforward: trust us, we share your dismay at software breaking.
  * If you can, [enable web developer extensions](http://macwright.org/enable-web-developer-extensions) and report the Javascript error message.

When in doubt, be over-descriptive of the bug and how you discovered it.

To request a feature:

  * If the feature is available in some other software like ArcXYZ ;-), link to that software and the implementation. We care about prior art.
  * if the feature is available in BoundLess GXP or GeoExplorer, notify us, we may add a configuration wrapper

## Issue Status ##

An issue goes through a lifecycle of Statuses. There are two broad Status categories: Open or Closed Statuses. Below are the specific statuses used:

<pre>
Open Statuses:<br>
New	 = Issue has not had initial review yet<br>
Accepted	 = Problem reproduced or feature/need acknowledged<br>
Started	 = Work on this issue has begun and is in progress<br>
Ready	 = Work has been completed and committed in Subversion, QA should verify<br>
<br>
Closed Statuses:<br>
Fixed	 = Developer made source code changes, no verification required (minor bugs)<br>
Verified	 = QA has verified that the Work (in Ready status) worked<br>
Invalid	 = This was not a valid issue report<br>
Duplicate	 = This report duplicates an existing issue<br>
WontFix	 = We decided to not take action on this issue<br>
Done	 = The requested non-coding task was completed<br>
</pre>

So a typical new feature goes _New --> Accepted --> Started --> Ready --> Verified_

  * The Opener of an issue puts it into _New_ status.
  * the Heron community/developers decide to accept/not accept the issue (_Accepted_) or immediately close (_Invalid_, _Duplicate_, _Wontfix_)
  * actual work begins (_Started_)
  * work is ready and committed in SVN (automatically deploys examples) (_Ready_)
  * Opener or QA verifies the work (_Verified_) or not ready (back to _Started_)

Minor changes go through:

> _New --> Accepted --> Started --> Fixed_

For questions and support type-issues:

> _New --> Accepted --> Started --> Done_

## Translating ##

Translations are managed currently under

https://code.google.com/p/geoext-viewer/source/browse/#svn%2Ftrunk%2Fheron%2Flib%2Fi18n

You may want to add a new translation or enhance existing ones. You may send a file
to the mailing list or better:

  * open an issue of type "patch"
  * create a Subversion Patch" and attach to the issue

## Contributing Documentation ##

Documentation is maintained as a series of [Sphinx Files](https://code.google.com/p/geoext-viewer/source/browse/#svn%2Ftrunk%2Fdocsrc). The API reference and examples documention is generated
from the code itself.

## Becoming Code Committer ##

Heron uses Subversion (we may move to Git at some point), so in order
to contribute code the most direct way is to become a committer.
We have a more or less formal process for this.

  * ask on the mailing list to become a committer
  * preferably provide a link to JavaScript code you have written
  * when all existing committers agree you're in!

You can offcourse always submit Subversion patches (see issue reporting above and translations).

## Javascript ##

We use the [Airbnb style for Javascript](https://github.com/airbnb/javascript) with
only one difference:

  * space soft tabs always for Javascript, not 2.

No aligned '=', no aligned arguments, spaces are either indents or the 1
space between expressions. No hard tabs, ever.

Javascript code should pass through [JSHint](http://www.jshint.com) with no
warnings.

## HTML ##

There isn't much HTML in Heron, but what there is is similar to JS: 4 spaces
always, indented by the level of the tree:

```
<div>
    <div></div>
</div>
```

## CSS ##

Just like HTML and Javascript, 4 space soft tabs always.

```
.radial-menu-tooltip {
   background: rgba(255, 255, 255, 0.8);
}
```

We write vanilla CSS with no preprocessing step. Since Heron targets modern browsers,
feel free to use newer features wisely.

## Tests ##

At this point we don't have a test framework. When making a new feature/enhancement
it is very helpful to also add an example under heron/examples. By adding these lines like:

```
/** api: example[featureinfopopup]
 *  FeatureInfoPopup
 *  ----------------
 *  Show WMS GetFeatureInfo in popup Window when clicking the Map.
 */
```

Your example will automatically show up in the documentation/website!

## Licensing ##

Heron is under the [GNU GPL v3 license](http://www.gnu.org/licenses/gpl.html). Some of the libraries it uses
are under different but compatible (we think/hope!) licenses. If you're contributing to Heron, you're contributing
GNU GPL v3 code.

## Submitting Changes ##

As a committer, whenever you check-in any change, even to documentation, to the Subversion repo, a new version, called 'latest' will be automagically checked-out and built on the Heron server (via a post-commit hook). Your changes will be publicly visible at the URL: http://lib.heron-mc.org/heron/latest
in particular the examples: http://lib.heron-mc.org/heron/latest/examples.

To be described further (Subversion or patch usage).

## Credits ##

The text above was taken with some freedom from another
inspiring project: [The OpenStreetMap iD Editor](https://github.com/systemed/iD).
