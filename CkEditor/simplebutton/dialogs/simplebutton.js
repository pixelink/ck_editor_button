/*

	This file is a part of simplebuttion project.

	Copyright (C) Thanh D. Dang <thanhdd.it@gmail.com>

	simplebuttion is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	simplebuttion is distributed in the hope that it will be useful, but
	WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/


// button color select field preset - [label, class]
const btnColors = [['Keine Farbe', 'none'], ['Weinrot', 'btn--whinered'], ['Dunkelgrün', 'btn--green-dark']];

// button type select field preset - [label, class]
const btnTypes = [['Standard', 'btn-default']];

// button icon select field preset - [label, class]
const btnIcons = [['Kein Icon', 'none'], ['Icon Schlaf (zZz)', 'icon--zzz--white'], ['Icon Kaffee', 'icon--coffee--white']];

// remove button icon classes from element (reset)
const resetIconClasses = (element) => {
  for (let i = 0; i < btnIcons.length; i++) {
    if (element.hasClass(btnIcons[i][1])) {
      element.removeClass(btnIcons[i][1]);
    }
  }
};

// remove button color classes from element (reset)
const resetColorClasses = (element) => {
  for (let i = 0; i < btnColors.length; i++) {
    if (element.hasClass(btnColors[i][1])) {
      element.removeClass(btnColors[i][1]);
    }
  }
};

// remove button type classes from element (reset)
const resetTypeClasses = (element) => {
  for (let i = 0; i < btnTypes.length; i++) {
    if (element.hasClass(btnTypes[i][1])) {
      element.removeClass(btnTypes[i][1]);
    }
  }
};


CKEDITOR.dialog.add('simplebuttonDialog', function (editor) {
  return {
    title: 'Button einfügen',
    minWidth: 400,
    minHeight: 200,
    contents: [
      {
        id: 'tab-basic',
        elements: [
          {
            type: 'text',
            id: 'button-text',
            label: 'Text',
            validate: CKEDITOR.dialog.validate.notEmpty("Text field cannot be empty."),
            setup: function (element, preview) {
              this.preview_button = preview;
              this.setValue(element.getText());
            },
            commit: function (element) {
              element.setText(this.getValue());
            },
            onChange: function () {
              this.preview_button.setText(this.getValue());
            }
          },
          {
            type: 'text',
            id: 'button-url',
            label: 'URL',
            setup: function (element) {
              this.setValue(element.getAttribute("href"));
            },
            commit: function (element) {
              element.setAttribute("href", this.getValue());
              element.removeAttribute('data-cke-saved-href');
            }
          },
          {
            type: 'select',
            id: 'button-type',
            label: 'Button-Stil',
            items: [...btnTypes],
            'default': 'btn-default',
            setup: function (element, preview) {
              this.preview_button = preview;
              // set select value based on element class

              for (let i = 0; i < btnTypes.length; i++) {
                if (element.hasClass(btnTypes[i][1])) {
                  this.setValue(btnTypes[i][1]);
                }
              }
            },
            commit: function (element) {
              // remove previous-set icon classes
              resetTypeClasses(element);

              // add class to element
              if (this.getValue().length > 0 && this.getValue() !== 'none') {
                element.addClass(this.getValue());
              }
            },
            onChange: function () {
              // remove previous-set icon classes
              resetTypeClasses(this.preview_button);

              // add class to preview
              if (this.getValue().length > 0 && this.getValue() !== 'none') {
                this.preview_button.addClass(this.getValue());
              }
            }
          },
          {
            type: 'select',
            id: 'button-color',
            label: 'Button-Farbe',
            items: [...btnColors],
            'default': 'btn--whinered',
            setup: function (element, preview) {
              this.preview_button = preview;
              // set select value based on element class

              for (let i = 0; i < btnColors.length; i++) {
                if (element.hasClass(btnColors[i][1])) {
                  this.setValue(btnColors[i][1]);
                }
              }
            },
            commit: function (element) {
              // remove previous-set icon classes
              resetColorClasses(element);

              // add class to element
              if (this.getValue().length > 0 && this.getValue() !== 'none') {
                element.addClass(this.getValue());
              }
            },
            onChange: function () {
              // remove previous-set icon classes
              resetColorClasses(this.preview_button);

              // add class to preview
              if (this.getValue().length > 0 && this.getValue() !== 'none') {
                this.preview_button.addClass(this.getValue());
              }
            }
          },
          {
            type: 'select',
            id: 'button-icon',
            label: 'Icon',
            items: [...btnIcons],
            'default': 'none',
            setup: function (element, preview) {
              this.preview_button = preview;

              // set select value based on element class
              for (let i = 0; i < btnIcons.length; i++) {
                if (element.hasClass(btnIcons[i][1])) {
                  this.setValue(btnIcons[i][1]);
                }
              }
            },
            commit: function (element) {
              // remove previous-set icon classes
              resetIconClasses(element);

              // add class to element
              if (this.getValue().length > 0 && this.getValue() !== 'none') {
                element.addClass(this.getValue());
              }
            },
            onChange: function () {
              // remove previous-set icon classes
              resetIconClasses(this.preview_button);

              // add class to preview
              if (this.getValue().length > 0 && this.getValue() !== 'none') {
                this.preview_button.addClass(this.getValue());
              }
            }
          }
        ]
      }
    ],

    onShow: function () {
      var selection = editor.getSelection();
      var element = selection.getStartElement();

      if (!element || !element.hasClass('simple-button-plugin')) {
        element = editor.document.createElement('a');
        element.setAttribute('class', 'simple-button-plugin btn-default');
        element.setAttribute('target', '_blank');
        element.setText('Unsubscribe');
        this.insertMode = true;
      }
      else
        this.insertMode = false;

      this.element = element;

      var preview_button = this.getElement().findOne(".preview-button");
      this.setupContent(this.element, preview_button);
    },

    onOk: function () {
      var dialog = this;
      var simple_btn = this.element;
      this.commitContent(simple_btn);

      if (this.insertMode)
        editor.insertElement(simple_btn);
    }
  };
});


/**
 * Gets styles by a classname
 *
 * @notice The className must be 1:1 the same as in the CSS
 * @param string className_
 */
function getStyle(className_) {

  var styleSheets = window.document.styleSheets;
  var styleSheetsLength = styleSheets.length;
  for (var i = 0; i < styleSheetsLength; i++) {
    var classes = styleSheets[i].rules || styleSheets[i].cssRules;
    if (!classes)
      continue;
    var classesLength = classes.length;
    for (var x = 0; x < classesLength; x++) {
      if (classes[x].selectorText == className_) {
        var ret;
        if (classes[x].cssText) {
          ret = classes[x].cssText;
        } else {
          ret = classes[x].style.cssText;
        }
        if (ret.indexOf(classes[x].selectorText) == -1) {
          ret = classes[x].selectorText + "{" + ret + "}";
        }
        return ret;
      }
    }
  }

}