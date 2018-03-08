const breakpoints =  {
	mobile: 320,
	tablet: 740,
	desktop: 980,
	wide: 1300
}

const pxToEm = (breakpoint, baseFontSize) => {
	return Math.round((breakpoint / baseFontSize) * 100) / 100 + 'em';
}

// Check if passed breakpoint name has a value
const getBreakpointWidth = (breakpoint, breakpoints) => {
	if(breakpoints[breakpoint]) {
		return breakpoints[breakpoint];
	}
	else {
		throw `Breakpoint ${breakpoint} wasn't found in breakpoints.`;
	}
}

/*
Full parameters:

from
until
and
mediaType
breakpoints
baseFontSize
responsive
staticBreakpoint
content
*/

const mq = (args) => {

	// Process default args
	const options = Object.assign({}, args);
	options.breakpoints = options.breakpoints ? options.breakpoints : breakpoints;
	options.mediaType = options.mediaType ? options.mediaType : 'all';
	options.baseFontSize = options.baseFontSize ? options.baseFontSize : 16;
	options.responsive = options.responsive !== undefined ? options.responsive : true;
	options.staticBreakpoint = options.staticBreakpoint ? options.staticBreakpoint : 'desktop';

	let minWidth = 0;
	let maxWidth = 0;
	let mediaQuery = '';

	// From: this breakpoint (inclusive)
	if(options.from !== undefined) {
		if(typeof options.from === 'number') {
			minWidth = pxToEm(options.from, options.baseFontSize);
		}
		else {
			minWidth = pxToEm(getBreakpointWidth(options.from, options.breakpoints), options.baseFontSize);
		}
	}

	// Until: that breakpoint (exclusive)
	if(options.until !== undefined) {
		if(typeof options.until === 'number') {
			maxWidth = pxToEm(options.until, options.baseFontSize);
		}
		else {
			maxWidth = pxToEm(getBreakpointWidth(options.until, options.breakpoints) - .01, options.baseFontSize);
		}
	}

	// Responsive support is disabled, rasterize the output outside @media blocks
	// The browser will rely on the cascade itself.
	if(!options.responsive) {
		const staticBreakpointWidth = getBreakpointWidth(options.staticBreakpoint, options.breakpoints);
		const targetWidth = pxToEm(staticBreakpointWidth, options.baseFontSize);
		// Output only rules that start at or span our target width
		if(!options.and && parseFloat(minWidth) <= parseFloat(targetWidth) && (!options.until || parseFloat(maxWidth) >= parseFloat(targetWidth))) {
			return options.content
		}
	}
	else {
		minWidth !== 0 ? mediaQuery =  `${mediaQuery} and (min-width: ${minWidth})` : '';
		maxWidth !== 0 ? mediaQuery =  `${mediaQuery} and (max-width: ${maxWidth})` : '';
		options.and !== undefined ? mediaQuery = `${mediaQuery} and ${options.and}` : '';

		// Remove unnecessary media query prefix 'all and '
		if(options.mediaType === 'all' && mediaQuery !== '') {
			options.mediaType = '';
			mediaQuery = mediaQuery.replace(options.mediaType + ' and ', '');
		}

		// Compose media query
		return `
			@media ${options.mediaType + mediaQuery} {
				${options.content}
			}
		`
	}
}

export default mq;
