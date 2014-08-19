/** @jsx React.DOM */

define(
  [
    'react'
  ],
  function (React) {

    var resources = [
      {
        title: "User Manual",
        href: "https://pods.iplantcollaborative.org/wiki/x/Iaxm",
        description: "Complete documentation for using Atmosphere"
      },
      {
        title: "User Forums",
        href: "http://ask.iplantcollaborative.org",
        description: "Get answers from iPlant users and staff"
      },
      {
        title: "FAQs",
        href: "https://pods.iplantcollaborative.org/wiki/x/Iaxm",
        description: "Atmosphere's most frequently asked questions"
      },
      {
        title: "VNC Viewer Tutorial",
        href: "https://pods.iplantcollaborative.org/wiki/x/Iaxm",
        description: "Instructions for downloading and using VNC Viewer"
      }
    ];

    return React.createClass({

      render: function () {

        var resourceElements = _.map(resources, function (resource) {
          return (
            <li key={resource.title}>
              <a href={resource.href} target="_blank">{resource.title}</a>
              <span>{" " + resource.description}</span>
            </li>
          );
        });

        return (
          <div className="container">
            <h2>External resources</h2>
            <ul>
              {resourceElements}
            </ul>
            <div>
              <h2>Contact</h2>
              <p>
                {"You can contact the Atmosphere support staff by sending an email to "}
                <a href="mailto:support@iplantcollaborative.org">support@iplantcollaborative.org</a>
              </p>
            </div>
          </div>
        );
      }
    });

  });