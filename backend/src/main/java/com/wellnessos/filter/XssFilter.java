package com.wellnessos.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class XssFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        XssRequestWrapper wrappedRequest = new XssRequestWrapper(httpRequest);
        chain.doFilter(wrappedRequest, response);
    }

    private static class XssRequestWrapper extends HttpServletRequestWrapper {

        public XssRequestWrapper(HttpServletRequest request) {
            super(request);
        }

        @Override
        public String getParameter(String name) {
            String value = super.getParameter(name);
            return sanitize(value);
        }

        @Override
        public String[] getParameterValues(String name) {
            String[] values = super.getParameterValues(name);
            if (values == null) {
                return null;
            }
            for (int i = 0; i < values.length; i++) {
                values[i] = sanitize(values[i]);
            }
            return values;
        }

        @Override
        public String getHeader(String name) {
            String value = super.getHeader(name);
            return sanitize(value);
        }

        private String sanitize(String value) {
            if (value == null) {
                return null;
            }
            return StringEscapeUtils.escapeHtml4(value)
                .replaceAll("(?i)<script.*?>.*?</script>", "")
                .replaceAll("(?i)<.*?on\\w+\\s*=\\s*[\"'][^\"']*[\"']>", "");
        }
    }
}
