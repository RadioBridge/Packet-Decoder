# TTN-Packet-Decoder
Radio Bridge Packet Protocol Decoder for use in TTN Payload Formats

CHANGE LOG

Release 0.1 - Initial Release

Release 0.2 - Standardized decoded variable names

              Removed redundant bytes conversions
              
              Exported ATH and TEMP calcs to modal function
              
              Temp/Humd/Angle decodes to values not bytes
              
              All returned values in numbers not strings

KNOWN ISSUES:

  Thermocouple does not go negative - update byte converter
  Simplemode descriptions sometimes too long for TTN display
  
For questions please contact:
support.radiobridge.com
