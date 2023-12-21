package com.example.miniproject.config.handler;

import java.io.IOException;

import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomRequestCacheFilter extends OncePerRequestFilter {

    private HttpSessionRequestCache requestCache = new HttpSessionRequestCache();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        SavedRequest savedRequest = requestCache.getRequest(request, response);

        if (savedRequest != null && session != null) {
            String targetUrl = savedRequest.getRedirectUrl();
            log.info("Saving request URL in session: " + targetUrl);
            session.setAttribute("PRE_AUTH_REQUEST_URI", targetUrl);
        }

        filterChain.doFilter(request, response);
    }
}
