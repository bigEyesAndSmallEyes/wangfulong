/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * KimMessageType enum.
 * @exports KimMessageType
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ANNOUNCEMENT_PUBLISHED=1002 ANNOUNCEMENT_PUBLISHED value
 */
$root.KimMessageType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1002] = "ANNOUNCEMENT_PUBLISHED"] = 1002;
    return values;
})();

$root.AnnouncementPublished = (function() {

    /**
     * Properties of an AnnouncementPublished.
     * @exports IAnnouncementPublished
     * @interface IAnnouncementPublished
     * @property {boolean|null} [sendToNew] AnnouncementPublished sendToNew
     * @property {string|null} [content] AnnouncementPublished content
     * @property {boolean|null} [sendToNewOnly] AnnouncementPublished sendToNewOnly
     */

    /**
     * Constructs a new AnnouncementPublished.
     * @exports AnnouncementPublished
     * @classdesc Represents an AnnouncementPublished.
     * @implements IAnnouncementPublished
     * @constructor
     * @param {IAnnouncementPublished=} [properties] Properties to set
     */
    function AnnouncementPublished(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AnnouncementPublished sendToNew.
     * @member {boolean} sendToNew
     * @memberof AnnouncementPublished
     * @instance
     */
    AnnouncementPublished.prototype.sendToNew = false;

    /**
     * AnnouncementPublished content.
     * @member {string} content
     * @memberof AnnouncementPublished
     * @instance
     */
    AnnouncementPublished.prototype.content = "";

    /**
     * AnnouncementPublished sendToNewOnly.
     * @member {boolean} sendToNewOnly
     * @memberof AnnouncementPublished
     * @instance
     */
    AnnouncementPublished.prototype.sendToNewOnly = false;

    /**
     * Creates a new AnnouncementPublished instance using the specified properties.
     * @function create
     * @memberof AnnouncementPublished
     * @static
     * @param {IAnnouncementPublished=} [properties] Properties to set
     * @returns {AnnouncementPublished} AnnouncementPublished instance
     */
    AnnouncementPublished.create = function create(properties) {
        return new AnnouncementPublished(properties);
    };

    /**
     * Encodes the specified AnnouncementPublished message. Does not implicitly {@link AnnouncementPublished.verify|verify} messages.
     * @function encode
     * @memberof AnnouncementPublished
     * @static
     * @param {IAnnouncementPublished} message AnnouncementPublished message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AnnouncementPublished.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sendToNew != null && message.hasOwnProperty("sendToNew"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.sendToNew);
        if (message.content != null && message.hasOwnProperty("content"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
        if (message.sendToNewOnly != null && message.hasOwnProperty("sendToNewOnly"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.sendToNewOnly);
        return writer;
    };

    /**
     * Encodes the specified AnnouncementPublished message, length delimited. Does not implicitly {@link AnnouncementPublished.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AnnouncementPublished
     * @static
     * @param {IAnnouncementPublished} message AnnouncementPublished message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AnnouncementPublished.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AnnouncementPublished message from the specified reader or buffer.
     * @function decode
     * @memberof AnnouncementPublished
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AnnouncementPublished} AnnouncementPublished
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AnnouncementPublished.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AnnouncementPublished();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sendToNew = reader.bool();
                break;
            case 2:
                message.content = reader.string();
                break;
            case 3:
                message.sendToNewOnly = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AnnouncementPublished message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AnnouncementPublished
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AnnouncementPublished} AnnouncementPublished
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AnnouncementPublished.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AnnouncementPublished message.
     * @function verify
     * @memberof AnnouncementPublished
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AnnouncementPublished.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sendToNew != null && message.hasOwnProperty("sendToNew"))
            if (typeof message.sendToNew !== "boolean")
                return "sendToNew: boolean expected";
        if (message.content != null && message.hasOwnProperty("content"))
            if (!$util.isString(message.content))
                return "content: string expected";
        if (message.sendToNewOnly != null && message.hasOwnProperty("sendToNewOnly"))
            if (typeof message.sendToNewOnly !== "boolean")
                return "sendToNewOnly: boolean expected";
        return null;
    };

    /**
     * Creates an AnnouncementPublished message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AnnouncementPublished
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AnnouncementPublished} AnnouncementPublished
     */
    AnnouncementPublished.fromObject = function fromObject(object) {
        if (object instanceof $root.AnnouncementPublished)
            return object;
        var message = new $root.AnnouncementPublished();
        if (object.sendToNew != null)
            message.sendToNew = Boolean(object.sendToNew);
        if (object.content != null)
            message.content = String(object.content);
        if (object.sendToNewOnly != null)
            message.sendToNewOnly = Boolean(object.sendToNewOnly);
        return message;
    };

    /**
     * Creates a plain object from an AnnouncementPublished message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AnnouncementPublished
     * @static
     * @param {AnnouncementPublished} message AnnouncementPublished
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AnnouncementPublished.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.sendToNew = false;
            object.content = "";
            object.sendToNewOnly = false;
        }
        if (message.sendToNew != null && message.hasOwnProperty("sendToNew"))
            object.sendToNew = message.sendToNew;
        if (message.content != null && message.hasOwnProperty("content"))
            object.content = message.content;
        if (message.sendToNewOnly != null && message.hasOwnProperty("sendToNewOnly"))
            object.sendToNewOnly = message.sendToNewOnly;
        return object;
    };

    /**
     * Converts this AnnouncementPublished to JSON.
     * @function toJSON
     * @memberof AnnouncementPublished
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AnnouncementPublished.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AnnouncementPublished;
})();

module.exports = $root;
